import { UsersRepository } from "../Lib/Repositories/UsersRepository";
import { User } from "../models/User";
import { Request, Response } from 'express';
import cryptoAES from "../helper/cryptoAES";

const bcrypt = require("bcrypt");
const saltRounds = 10;
const config = require("../config");
const jwt = require('jsonwebtoken');


export default class Users {
    userRepository: UsersRepository;
    cryptoAESHelper: cryptoAES;

    constructor() {
        this.userRepository = new UsersRepository();
        this.cryptoAESHelper = new cryptoAES();
    }

    public async GetAll(req: Request, res: Response) {
        try {
            //Récupération de la page souhaitée
            const numPage: number = parseInt(String(req.query.page)) || 1;

            await this.userRepository.GetAllUsers(numPage)
                .then((data: User[]) => {
                    if (data != null && data.length > 0) {
                        data.forEach(async element => {
                            element = await this.DecryptData(element)
                        });

                        res.status(200).send(data);
                    }
                    else {
                        res.status(204).send();
                    }
                })
                .catch((err: { message: any; }) => {
                    res.status(500).send({
                        message: err.message || "Une erreur imprévue s'est produite lors de la récupération de tous les utilisateurs"
                    })
                })
        }
        catch (error: any) {
            res.status(500).send({ message: error.message || "Une erreur imprévue s'est produite lors de la récupération de tous les utilisateurs" });
        }
    }

    public async GetById(req: Request, res: Response) {
        try {
            //Récupération de la page souhaitée
            const idUser: number = parseInt(req.params.ID_USER);

            if (Number.isNaN(idUser)) {
                res.status(400).send({
                    message: "L'ID de la requête n'est pas valide"
                })
            }
            else {
                await this.userRepository.GetUserById(idUser)
                    .then(async (data: User | null) => {
                        if (data != null) {
                            data = await this.DecryptData(data);
                            res.status(200).send(data);
                        }
                        else {
                            res.status(400).send({ resultat: false, message: "Aucun utilisateur trouvé avec cette ID" });
                        }
                    })
                    .catch((err: { message: any; }) => {
                        res.status(500).send({
                            message: err.message || "Une erreur imprévue s'est produite lors de la récupération d'un utilisateur via son ID"
                        })
                    })
            }
        }
        catch (error: any) {
            res.status(500).send({ message: error.message || "Une erreur imprévue s'est produite lors de la récupération d'un utilisateur via son ID" });
        }
    }

    public async AuthUser(req: Request, res: Response) {
        try {
            //Récupération de la page souhaitée
            const userEmail: string = req.body.EMAIL;

            await this.userRepository.GetUserByEmail(userEmail)
                .then(async (data: User | null) => {
                    if (data != null) {
                        console.log(this);

                        const resultCheck = await this.ValidateUser(req.body.PASSWORD, data.PASSWORD);
                        if (resultCheck) {
                            const token = await this.GenerateAccessToken(data);

                            res.status(200).send({ resultat: true, message: "Authentification réussit", token: token });
                        }
                        else {
                            res.status(400).send({ resultat: false, message: "L'authentification a échouée" });
                        }
                    }
                    else {
                        res.status(400).send({ resultat: false, message: "Aucun utilisateur trouvé avec cette adresse email" });
                    }
                })
                .catch((err: { message: any; }) => {
                    res.status(500).send({
                        message: err.message || "Une erreur imprévue s'est produite lors de la récupération d'un utilisateur via son ID"
                    })
                })
        }
        catch (error: any) {
            res.status(500).send({ message: error.message || "Une erreur imprévue s'est produite lors de la récupération d'un utilisateur via son ID" });
        }
    }

    public async PostNewUser(req: Request, res: Response) {
        try {
            //On défini la clé primaire à null
            req.body.ID_USER = null;
            req.body.ID_ACCOUNT_STATUS = 1; //A la création, c'est un compte de type utilisateur

            //Vérification que l'email n'est pas déjà utilisée
            await this.userRepository.GetUserByEmail(req.body.EMAIL)
                .then(async (data: User | null) => {
                    if (data != null) {
                        res.status(400).send({ message: "Cette adresse email est déjà utilisé sur un autre compte" })
                    }
                    else {
                        //Vérification de la validité des données
                        const resultCheck = await this.CheckDataIntegrity(req.body, true);
                        req.body = await this.EncryptData(req.body);

                        //Hash du mot de passe
                        req.body.PASSWORD = await this.HashPassword(req.body.PASSWORD);

                        if (resultCheck == null) {
                            this.userRepository.PostNewUser(req.body)
                                .then(() => res.status(201).send())
                                .catch((err: { message: any; }) => {
                                    console.log(err);
                                    res.status(500).send({
                                        message: err.message || "Une erreur imprévue s'est produite lors de la création d'un utilisateur"
                                    })
                                })
                        }
                        else {
                            res.status(400).send({
                                message: resultCheck
                            })
                        }
                    }
                })
                .catch((err: { message: any; }) => {
                    console.log(err);
                    res.status(500).send({
                        message: err.message || "Une erreur imprévue s'est produite lors de la vérification de l'unicuté de l'adresse email de l'utilisateur"
                    })
                })
        }
        catch (error: any) {
            console.log(error);
            res.status(500).send({ message: error.message || "Une erreur imprévue s'est produite lors de la création d'un utilisateur" });
        }
    }

    public async PutUser(req: Request, res: Response) {
        //On modifie l'ID user dans le body
        req.body.ID_USER = parseInt(req.params.ID_USER);

        try {
            if (Number.isNaN(req.body.ID_USER)) {
                res.status(400).send({
                    message: "L'ID de la requête n'est pas valide"
                })
            }
            else {
                await this.userRepository.GetUserById(req.body.ID_USER)
                    .then(async (data: User | null) => {
                        if (data == null) {
                            res.status(400).send({ message: "Aucun utilisateur touvé avec cette ID" })
                        }
                        else {
                            //Si le mot de passe est vide, alors on récupère celui dans la base de données
                            if (!req.body.PASSWORD) { req.body.PASSWORD = data!.PASSWORD }

                            const resultCheck = await this.CheckDataIntegrity(req.body, false);
                            if (resultCheck == null) {
                                this.userRepository.PutUser(req.body)
                                    .then(() => res.status(204).send())
                                    .catch((err: { message: any; }) => {
                                        res.status(500).send({
                                            message: err.message || "Une erreur imprévue s'est produite lors de la modification d'un utilisateur"
                                        })
                                    })
                            }
                            else {
                                res.status(400).send({
                                    message: resultCheck
                                })
                            }
                        }
                    })
                    .catch((err: { message: any; }) => {
                        res.status(500).send({
                            message: err.message || "Une erreur imprévue s'est produite lors de la modification d'un utilisateur"
                        })
                    })
            }
        }
        catch (error: any) {
            res.status(500).send({ message: error.message || "Une erreur imprévue s'est produite lors de la modification d'un utilisateur" });
        }
    }

    public async DeleteUser(req: Request, res: Response) {
        try {
            this.userRepository.DeleteUser(parseInt(req.params.ID_USER))
                .then(rowDeleted => {
                    if (rowDeleted == 1) {
                        res.status(200).send({
                            message: `L'utilisateur avec l'ID ${req.params.ID_USER} a bien été supprimé.`
                        });
                    }
                    else {
                        res.status(400).send({
                            message: `L'utilisateur avec l'ID ${req.params.ID_USER} n'a pas pu être supprimé (rowDeleted = ${rowDeleted})`
                        });
                    }
                })
                .catch((err: { message: any; }) => {
                    res.status(500).send({
                        message: err.message || "Une erreur imprévue s'est produite lors de la suppression d'un utilisateur"
                    })
                })
        }
        catch (error: any) {
            res.status(500).send({ message: error.message || "Une erreur imprévue s'est produite lors de la suppression d'un utilisateur" });
        }
    }

    //Fonction permettant de validé le mot de passe de l'utilisateur
    private async ValidateUser(password: string, hash: string) {
        return new Promise((resolve, reject) => {
            bcrypt
                .compare(password, hash)
                .then((res: string) => { resolve(res) })
                .catch((err: { message: string; }) => { reject(err.message) })
        })
    }

    //Fonction pour hashé le mot de passe
    private async HashPassword(password: string): Promise<string> {
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
    private async GenerateAccessToken(dataUser: User) {
        return new Promise((resolve, reject) => {
            resolve(jwt.sign({ "ID_USER": dataUser.ID_USER, "PSEUDONYM": dataUser.PSEUDONYM }, config.token_secret, { expiresIn: config.token_life }))
        })
    }

    // //Fonction permettant la vérification de l'intégrité des données avant ajout ou modification en BDD
    private async CheckDataIntegrity(dataUser: User, isUserCreation = false) {
        if (!dataUser.PSEUDONYM) { return "Veuillez entrer un pseudonyme" }
        if (!dataUser.LAST_NAME) { return "Veuillez entrer un nom de famille" }
        if (!dataUser.FIRST_NAME) { return "Veuillez entrer un prénom" }
        if (!dataUser.DATE_OF_BIRTH) { return "Veuillez entrer une date de naissance" }
        if (!dataUser.EMAIL) { return "Veuillez entrer une adresse email" }
        if (!dataUser.ADDRESS_STREET) { return "Veuillez entrer la rue de votre adresse" }
        if (!dataUser.ADDRESS_ZIP_CODE) { return "Veuillez entrer le code postal de votre adresse" }
        if (!dataUser.ADDRESS_CITY) { return "Veuillez entrer la ville de votre adresse" }
        if (!dataUser.PROFIL_PICTURE) { return "Veuillez entrer une photo de profil" }

        if (isUserCreation) {
            var caractereMinusculeRegex = new RegExp("^(?=.*[a-z])");
            var caractereMajusculeRegex = new RegExp("^(?=.*[A-Z])");
            var chiffreRegex = new RegExp("^(?=.*[0-9])");
            var caractereSpecialRegex = new RegExp("^(?=.*[!@#\$%\^&\*])");
            var longueurRegex = new RegExp("^(?=.{8,})");
            if (!caractereMinusculeRegex.test(dataUser.PASSWORD)) {
                return "Votre mot de passe doit contenir au moins une minuscule";
            }
            else if (!caractereMajusculeRegex.test(dataUser.PASSWORD)) {
                return "Votre mot de passe doit contenir au moins une majuscule";
            }
            else if (!chiffreRegex.test(dataUser.PASSWORD)) {
                return "Votre mot de passe doit contenir au moins un chiffre";
            }
            else if (!caractereSpecialRegex.test(dataUser.PASSWORD)) {
                return "Votre mot de passe doit contenir au moins un caractère spécial";
            }
            else if (!longueurRegex.test(dataUser.PASSWORD)) {
                return "Votre mot de passe doit faire au moins 8 caractères";
            }
        }
        else {
            if (!dataUser.PASSWORD) { return "Veuillez entrer un mot de passe" }
        }

        return null;
    }

    private async EncryptData(user: User): Promise<User> {
        if (config.KEY_AES != undefined) {
            user.PSEUDONYM = await this.cryptoAESHelper.Encrypt(user.PSEUDONYM);
            user.LAST_NAME = await this.cryptoAESHelper.Encrypt(user.LAST_NAME);
            user.FIRST_NAME = await this.cryptoAESHelper.Encrypt(user.FIRST_NAME);
            user.ADDRESS_STREET = await this.cryptoAESHelper.Encrypt(user.ADDRESS_STREET);
            user.ADDRESS_ZIP_CODE = await this.cryptoAESHelper.Encrypt(user.ADDRESS_ZIP_CODE);
            user.ADDRESS_CITY = await this.cryptoAESHelper.Encrypt(user.ADDRESS_CITY);
        }

        return user;
    }

    private async DecryptData(user: User): Promise<User> {
        if (config.KEY_AES != undefined) {
            user.PSEUDONYM = await this.cryptoAESHelper.Decrypt(user.PSEUDONYM);
            user.LAST_NAME = await this.cryptoAESHelper.Decrypt(user.LAST_NAME);
            user.FIRST_NAME = await this.cryptoAESHelper.Decrypt(user.FIRST_NAME);
            user.ADDRESS_STREET = await this.cryptoAESHelper.Decrypt(user.ADDRESS_STREET);
            user.ADDRESS_ZIP_CODE = await this.cryptoAESHelper.Decrypt(user.ADDRESS_ZIP_CODE);
            user.ADDRESS_CITY = await this.cryptoAESHelper.Decrypt(user.ADDRESS_CITY);
        }

        return user;
    }
}