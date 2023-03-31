const bcrypt = require("bcrypt");
const saltRounds = 10;
import { User } from "../models/User";
const config = require("../config");
const jwt = require('jsonwebtoken');

//Fonction permettant de récupérer la liste de tous les utilisateurs
exports.findAll = (req: { query: { page: number; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: User[] | { message: string }): void; new(): any; }; }; }) => {
    const numPage: number = req.query.page || 1;

    //On renvoi un maximum de X utilisateurs (X = config.listPerPage)
    User.findAll({ limit: parseInt(config.listPerPage!), offset: ((numPage - 1) * parseInt(config.listPerPage!)) })
        .then((data: User[]) => {
            res.status(200).send(data);
        })
        .catch((err: { message: any; }) => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération de tous les utilisateurs"
            });
        })
}

//Fonction permettant de récupérer un utilisateur via son ID
exports.findOne = (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: User | { message: string }): void; new(): any; }; }; sendStatus: (arg0: number) => void; }) => {
    const idUser = req.params.id;

    User.findByPk(idUser)
        .then((data: User | null) => {
            if (data) {
                res.status(200).send(data);
            }
            else {
                res.sendStatus(204);
            }
        })
        .catch((err: { message: any; }) => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération d'un utilisateur"
            });
        })
}

//Fonction permettant de retourner un booléan si l'identifiant et mot de passe valide
exports.authUser = (req: { body: { EMAIL: any; PASSWORD: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { resultat?: boolean; message: any; token?: unknown; }): void; new(): any; }; }; }) => {
    const donneesUtilisateur = {
        EMAIL: req.body.EMAIL,
        PASSWORD: req.body.PASSWORD
    };

    User.findOne({ where: { EMAIL: donneesUtilisateur.EMAIL } })
        .then(async (data: User | null) => {
            if (data) {
                if (await validateUser(donneesUtilisateur.PASSWORD, data.PASSWORD)) {
                    let token = await generateAccessToken(data);

                    res.status(200).send({ resultat: true, message: "Authentification réussit", token: token });
                }
                else {
                    res.status(200).send({ resultat: false, message: "Authentification non valide" });
                }
            }
            else {
                res.status(400).send({ resultat: false, message: "Aucun utilisateur trouvé avec cette adresse email" });
            }
        })
        .catch((err: { message: any; }) => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération d'un utilisateur"
            });
        })
}

//Fonction d'ajout d'un utilisateur
exports.addOne = async (req: { body: User }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
    //Comme il s'agit d'un ajout, on modifie les valeurs de l'ID Utilisateur ainsi que du statut du compte
    req.body.ID_USER = 0;
    req.body.ID_ACCOUNT_STATUS = 1;

    const donneesValide = checkDataIntegrity(req.body, true);

    //Si les données sont valides, alors on Hash le mot de passe
    req.body.PASSWORD = await hashPassword(req.body.PASSWORD);

    if (donneesValide) {
        res.status(400).send({
            message: donneesValide
        })
    }
    else {
        User.create(req.body)
            .then(() => {
                res.status(201).send({ message: "Création de l'utilisateur réussit" });
            })
            .catch((err: { message: any; }) => {
                res.status(500).send({
                    message: err.message || "Une erreur s'est produite lors de la création d'un utilisateur"
                });
            })
    }
}

//Fonction de modification d'un utilisateur
exports.update = (req: { params: { id: number; }; body: User }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
    const idUser = req.params.id;

    if (!idUser) {
        res.status(400).send({ message: "Veuillez entrer un id utilisateur à modifier" })
    }

    User.findByPk(idUser)
        .then(async (data) => {
            //Les élements qui ne doivent pas changer
            req.body.ID_USER = data!.ID_USER;

            //Si le mot de passe est vide, alors on récupère celui dans la base de données
            if (!req.body.PASSWORD) { req.body.PASSWORD = data!.PASSWORD }

            const donneesValide = checkDataIntegrity(req.body);

            //Si le mot de passe change, alors on le hash
            if (req.body.PASSWORD != data!.PASSWORD) {
                req.body.PASSWORD = await hashPassword(req.body.PASSWORD);
            }

            if (donneesValide) {
                res.status(400).send({
                    message: donneesValide
                })
            }
            else {
                User.update(req.body, { where: { ID_USER: idUser } })
                    .then(() => {
                        res.status(200).send({ message: "Utilisateur mis à jour" });
                    })
                    .catch((err: { message: any; }) => {
                        res.status(500).send({
                            message: err.message || "Une erreur s'est produite lors de la modification d'un utilisateur"
                        });
                    })
            }
        })
        .catch((err: { message: any; }) => {
            res.status(400).send({
                message: err.message || "La récupération des données de l'utilisateur avant modification a échouée"
            });
        })
}

//Fonction de suppression d'un utilisateur
exports.delete = (req: { params: { id: number; }; }, res: { send: (arg0: { message: string; }) => void; status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    const idUser = req.params.id;

    User.destroy({ where: { ID_USER: idUser } })
        .then((num: number) => {
            if (num == 1) {
                res.send({ message: `L'utilisateur id ${idUser} a bien été supprimé` })
            }
            else {
                res.status(400).send({ message: `L'utilisateur id ${idUser} n'a pas pu être supprimé, peut-être que cette id n'exite pas ?` })
            }
        })
        .catch((err: { message: string; }) => {
            console.log("Une erreur s'est produite lors de la suppression d'un utilisateur : " + err.message)
            res.status(500).send({ message: `Impossible de supprimer l'utilisateur id ${idUser}` })
        })
}

//Permet de valider le mot de passe avec le hash en base
function validateUser(password: string, hash: string) {
    return new Promise((resolve, reject) => {
        bcrypt
            .compare(password, hash)
            .then((res: string) => { resolve(res) })
            .catch((err: { message: string; }) => { reject(err.message) })
    })
}

//Fonction pour hashé le mot de passe
function hashPassword(password: string): Promise<string> {
    if (password.length == 0) { throw new Error("Impossible d'hashé un mot de passe vide !"); }

    return new Promise((resolve, reject) => {
        bcrypt
            .hash(password, saltRounds)
            .then((hash: string) => {
                resolve(hash);
            })
            .catch((err: { message: any; }) => reject(err.message))
    })
}

//Fonction permettant de générer un token
function generateAccessToken(donneesUtilisateur: User) {
    return new Promise((resolve, reject) => {
        resolve(jwt.sign({ "ID_UTILISATEUR": donneesUtilisateur.ID_USER, "PSEUDONYME": donneesUtilisateur.PSEUDONYM }, config.token_secret, { expiresIn: config.token_life }))
    })
}

//Fonction permettant la vérification de l'intégrité des données avant ajout ou modification en BDD
function checkDataIntegrity(donneesUtilisateur: User, isUserCreation = false) {
    if (!donneesUtilisateur.PSEUDONYM) { return "Veuillez entrer un pseudonyme" }
    if (!donneesUtilisateur.LAST_NAME) { return "Veuillez entrer un nom de famille" }
    if (!donneesUtilisateur.FIRST_NAME) { return "Veuillez entrer un prénom" }
    if (!donneesUtilisateur.DATE_OF_BIRTH) { return "Veuillez entrer une date de naissance" }
    if (!donneesUtilisateur.EMAIL) { return "Veuillez entrer une adresse email" }
    if (!donneesUtilisateur.ADDRESS_STREET) { return "Veuillez entrer la rue de votre adresse" }
    if (!donneesUtilisateur.ADDRESS_ZIP_CODE) { return "Veuillez entrer le code postal de votre adresse" }
    if (!donneesUtilisateur.ADDRESS_CITY) { return "Veuillez entrer la ville de votre adresse" }
    if (!donneesUtilisateur.PROFIL_PICTURE) { return "Veuillez entrer une photo de profil" }

    if (isUserCreation) {
        var caractereMinusculeRegex = new RegExp("^(?=.*[a-z])");
        var caractereMajusculeRegex = new RegExp("^(?=.*[A-Z])");
        var chiffreRegex = new RegExp("^(?=.*[0-9])");
        var caractereSpecialRegex = new RegExp("^(?=.*[!@#\$%\^&\*])");
        var longueurRegex = new RegExp("^(?=.{8,})");
        if (!caractereMinusculeRegex.test(donneesUtilisateur.PASSWORD)) {
            return "Votre mot de passe doit contenir au moins une minuscule";
        }
        else if (!caractereMajusculeRegex.test(donneesUtilisateur.PASSWORD)) {
            return "Votre mot de passe doit contenir au moins une majuscule";
        }
        else if (!chiffreRegex.test(donneesUtilisateur.PASSWORD)) {
            return "Votre mot de passe doit contenir au moins un chiffre";
        }
        else if (!caractereSpecialRegex.test(donneesUtilisateur.PASSWORD)) {
            return "Votre mot de passe doit contenir au moins un caractère spécial";
        }
        else if (!longueurRegex.test(donneesUtilisateur.PASSWORD)) {
            return "Votre mot de passe doit faire au moins 8 caractères";
        }
    }
    else {
        if (!donneesUtilisateur.PASSWORD) { return "Veuillez entrer un mot de passe" }
    }
}