const bcrypt = require("bcrypt");
const saltRounds = 10;
import { Utilisateur } from "../models/Utilisateur";
const config = require("../config");
const jwt = require('jsonwebtoken');

//Fonction permettant de récupérer la liste de tous les utilisateurs
exports.findAll = (req: { query: { page: number; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: Utilisateur[] | { message: string }): void; new(): any; }; }; }) => {
    const numPage: number = req.query.page || 1;

    //On renvoi un maximum de X utilisateurs (X = config.listPerPage)
    Utilisateur.findAll({ limit: parseInt(config.listPerPage!), offset: ((numPage - 1) * parseInt(config.listPerPage!)) })
        .then((data: Utilisateur[]) => {
            res.status(200).send(data);
        })
        .catch((err: { message: any; }) => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération de tous les utilisateurs"
            });
        })
}

//Fonction permettant de récupérer un utilisateur via son ID
exports.findOne = (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: Utilisateur | { message: string }): void; new(): any; }; }; sendStatus: (arg0: number) => void; }) => {
    const idUser = req.params.id;

    Utilisateur.findByPk(idUser)
        .then((data: Utilisateur | null) => {
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
exports.authUser = (req: { body: { ADRESSE_EMAIL: any; MOT_DE_PASSE: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { resultat?: boolean; message: any; token?: unknown; }): void; new(): any; }; }; }) => {
    const donneesUtilisateur = {
        ADRESSE_EMAIL: req.body.ADRESSE_EMAIL,
        MOT_DE_PASSE: req.body.MOT_DE_PASSE
    };

    Utilisateur.findOne({ where: { ADRESSE_EMAIL: donneesUtilisateur.ADRESSE_EMAIL } })
        .then(async (data: Utilisateur | null) => {
            if (data) {
                if (await validateUser(donneesUtilisateur.MOT_DE_PASSE, data.MOT_DE_PASSE)) {
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
exports.addOne = async (req: { body: Utilisateur }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
    //Comme il s'agit d'un ajout, on modifie les valeurs de l'ID Utilisateur ainsi que du statut du compte
    req.body.ID_UTILISATEUR = 0;
    req.body.ID_STATUT_COMPTE = 1;

    const donneesValide = checkDataIntegrity(req.body, true);

    //Si les données sont valides, alors on Hash le mot de passe
    req.body.MOT_DE_PASSE = await hashPassword(req.body.MOT_DE_PASSE);

    if (donneesValide) {
        res.status(400).send({
            message: donneesValide
        })
    }
    else {
        Utilisateur.create(req.body)
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
exports.update = (req: { params: { id: number; }; body: Utilisateur }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: any; }): void; new(): any; }; }; }) => {
    const idUser = req.params.id;

    if (!idUser) {
        res.status(400).send({ message: "Veuillez entrer un id utilisateur à modifier" })
    }

    Utilisateur.findByPk(idUser)
        .then(async (data) => {
            //Les élements qui ne doivent pas changer
            req.body.ID_UTILISATEUR = data!.ID_UTILISATEUR;

            //Si le mot de passe est vide, alors on récupère celui dans la base de données
            if (!req.body.MOT_DE_PASSE) { req.body.MOT_DE_PASSE = data!.MOT_DE_PASSE }

            const donneesValide = checkDataIntegrity(req.body);

            //Si le mot de passe change, alors on le hash
            if (req.body.MOT_DE_PASSE != data!.MOT_DE_PASSE) {
                req.body.MOT_DE_PASSE = await hashPassword(req.body.MOT_DE_PASSE);
            }

            if (donneesValide) {
                res.status(400).send({
                    message: donneesValide
                })
            }
            else {
                Utilisateur.update(req.body, { where: { ID_UTILISATEUR: idUser } })
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

    Utilisateur.destroy({ where: { ID_UTILISATEUR: idUser } })
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
function generateAccessToken(donneesUtilisateur: Utilisateur) {
    return new Promise((resolve, reject) => {
        resolve(jwt.sign({ "ID_UTILISATEUR": donneesUtilisateur.ID_UTILISATEUR, "PSEUDONYME": donneesUtilisateur.PSEUDONYME }, config.token_secret, { expiresIn: config.token_life }))
    })
}

//Fonction permettant la vérification de l'intégrité des données avant ajout ou modification en BDD
function checkDataIntegrity(donneesUtilisateur: Utilisateur, isUserCreation = false) {
    if (!donneesUtilisateur.PSEUDONYME) { return "Veuillez entrer un pseudonyme" }
    if (!donneesUtilisateur.NOM) { return "Veuillez entrer un nom de famille" }
    if (!donneesUtilisateur.PRENOM) { return "Veuillez entrer un prénom" }
    if (!donneesUtilisateur.DATE_DE_NAISSANCE) { return "Veuillez entrer une date de naissance" }
    if (!donneesUtilisateur.ADRESSE_EMAIL) { return "Veuillez entrer une adresse email" }
    if (!donneesUtilisateur.ADRESSE_RUE) { return "Veuillez entrer la rue de votre adresse" }
    if (!donneesUtilisateur.ADRESSE_CODE_POSTAL) { return "Veuillez entrer le code postal de votre adresse" }
    if (!donneesUtilisateur.ADRESSE_VILLE) { return "Veuillez entrer la ville de votre adresse" }
    if (!donneesUtilisateur.PHOTO_DE_PROFIL) { return "Veuillez entrer une photo de profil" }

    if (isUserCreation) {
        var caractereMinusculeRegex = new RegExp("^(?=.*[a-z])");
        var caractereMajusculeRegex = new RegExp("^(?=.*[A-Z])");
        var chiffreRegex = new RegExp("^(?=.*[0-9])");
        var caractereSpecialRegex = new RegExp("^(?=.*[!@#\$%\^&\*])");
        var longueurRegex = new RegExp("^(?=.{8,})");
        if (!caractereMinusculeRegex.test(donneesUtilisateur.MOT_DE_PASSE)) {
            return "Votre mot de passe doit contenir au moins une minuscule";
        }
        else if (!caractereMajusculeRegex.test(donneesUtilisateur.MOT_DE_PASSE)) {
            return "Votre mot de passe doit contenir au moins une majuscule";
        }
        else if (!chiffreRegex.test(donneesUtilisateur.MOT_DE_PASSE)) {
            return "Votre mot de passe doit contenir au moins un chiffre";
        }
        else if (!caractereSpecialRegex.test(donneesUtilisateur.MOT_DE_PASSE)) {
            return "Votre mot de passe doit contenir au moins un caractère spécial";
        }
        else if (!longueurRegex.test(donneesUtilisateur.MOT_DE_PASSE)) {
            return "Votre mot de passe doit faire au moins 8 caractères";
        }
    }
    else {
        if (!donneesUtilisateur.MOT_DE_PASSE) { return "Veuillez entrer un mot de passe" }
    }
}