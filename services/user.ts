import { UsersRepository } from "../Lib/Repositories/UsersRepository";
import { TokenRepository } from "../Lib/Repositories/TokenRepository";
import { User } from "../models/User";
import { Request, Response } from 'express';
import cryptoAES from "../helper/cryptoAES";
import { Token } from "../models/Token";
import { TokenAttributes } from "../Lib/IModels/TokenAttributes";

const bcrypt = require("bcrypt");
const saltRounds = 10;
const config = require("../config");
const jwt = require('jsonwebtoken');


export default class Users {
    userRepository: UsersRepository;
    tokenRepository: TokenRepository;
    cryptoAESHelper: cryptoAES;

    constructor() {
        this.userRepository = new UsersRepository();
        this.tokenRepository = new TokenRepository();
        this.cryptoAESHelper = new cryptoAES();
    }

    public async GetAll(req: Request, res: Response) {
        try {
            //Récupération de la page souhaitée
            const numPage: number = parseInt(String(req.query.page)) || 1;

            const filterValue: string | undefined = req.query.filter?.toString();

            if (filterValue !== undefined) {
                await this.userRepository.GetAllUsersWithFilter(numPage, filterValue)
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
            else {
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

    public async GetLimitedInformationById(req: Request, res: Response) {
        try {
            //Récupération de la page souhaitée
            const idUser: number = parseInt(req.params.ID_USER);

            if (Number.isNaN(idUser)) {
                res.status(400).send({
                    message: "L'ID de la requête n'est pas valide"
                })
            }
            else {
                await this.userRepository.GetLimitedUserInformationById(idUser)
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
                        if (data.ID_ACCOUNT_STATUS != 5) {
                            const resultCheck = await this.ValidateUser(req.body.PASSWORD, data.PASSWORD);
                            if (resultCheck) {
                                const token: string = await this.GenerateAccessToken(data);

                                //Enregistrement du token en BDD
                                const tokenForDatabase: TokenAttributes = { ID_USER: data.ID_USER, TOKEN: token, DATE_TOKEN: new Date(Date.now()) };
                                await this.tokenRepository.PostNewToken(tokenForDatabase)

                                res.status(200).send({ resultat: true, message: "Authentification réussit", token: token });
                            }
                            else {
                                res.status(400).send({ resultat: false, message: "L'authentification a échouée" });
                            }
                        }
                        else {
                            res.status(401).send({ resultat: false, message: "Votre compte est désactivé" })
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
            if (req.body.ID_ACCOUNT_STATUS == "" || req.body.ID_ACCOUNT_STATUS == undefined) {
                req.body.ID_ACCOUNT_STATUS = 1;
            }

            //Vérification que l'email ou le pseudonym n'est pas déjà utilisée
            await this.CheckUnitEmailAndPseudonym(req.body)
                .then(async (result: string | null) => {
                    if (result != null) {
                        res.status(400).send({ message: result })
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
                await this.userRepository.GetUserFullById(req.body.ID_USER)
                    .then(async (data: User | null) => {
                        if (data == null) {
                            res.status(400).send({ message: "Aucun utilisateur touvé avec cette ID" })
                        }
                        else {
                            //Vérification que l'email ou le pseudonym n'est pas déjà utilisée
                            await this.CheckUnitEmailAndPseudonym(req.body)
                                .then(async (result: string | null) => {
                                    if (result != null) {
                                        res.status(400).send({ message: result })
                                    }
                                    else {
                                        let resultCheck: string | null = null;
                                        //Si le mot de passe est vide, alors on récupère celui dans la base de données
                                        if (!req.body.PASSWORD) {
                                            req.body.PASSWORD = data!.PASSWORD
                                            resultCheck = await this.CheckDataIntegrity(req.body, false);
                                        }
                                        else {
                                            resultCheck = await this.CheckDataIntegrity(req.body, true);
                                            req.body.PASSWORD = await this.HashPassword(req.body.PASSWORD);
                                        }

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
    private async GenerateAccessToken(dataUser: User): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve(
                jwt.sign(
                    {
                        "ID_USER": dataUser.ID_USER,
                        "PSEUDONYM": dataUser.PSEUDONYM,
                        "IS_MODERATOR": dataUser.ID_ACCOUNT_STATUS == 2 ? true : false,
                        "IS_ADMINISTRATOR": dataUser.ID_ACCOUNT_STATUS == 3 ? true : false,
                        "IS_SUPER_ADMINISTRATOR": dataUser.ID_ACCOUNT_STATUS == 4 ? true : false
                    },
                    config.token_secret,
                    { expiresIn: config.token_life }
                )
            )
        })
    }

    // //Fonction permettant la vérification de l'intégrité des données avant ajout ou modification en BDD
    private async CheckDataIntegrity(dataUser: User, checkNewPassord = false) {
        if (!dataUser.PSEUDONYM) { return "Veuillez entrer un pseudonyme" }
        if (!dataUser.LAST_NAME) { return "Veuillez entrer un nom de famille" }
        if (!dataUser.FIRST_NAME) { return "Veuillez entrer un prénom" }
        if (!dataUser.DATE_OF_BIRTH) { return "Veuillez entrer une date de naissance" }
        if (!dataUser.EMAIL) { return "Veuillez entrer une adresse email" }

        if (checkNewPassord) {
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

        return null;
    }

    //Permet de vérifier l'unicité de l'email et pseudo de l'utilisateur
    private async CheckUnitEmailAndPseudonym(user: User) {
        let result = null;

        await this.userRepository.GetUserByEmail(user.EMAIL)
            .then(async (data: User | null) => {
                if (data != null) {
                    //On vérifie si l'utilisateur retourné n'est pas l'utilisateur qu'on veux modifier
                    if (data.ID_USER != user.ID_USER) {
                        result = "Cette adresse email est déjà utilisé sur un autre compte"
                    }
                }
            })

        if (result == null) {
            await this.userRepository.GetUserByPseudonym(user.PSEUDONYM)
                .then(async (data: User | null) => {
                    if (data != null) {
                        //On vérifie si l'utilisateur retourné n'est pas l'utilisateur qu'on veux modifier
                        if (data.ID_USER != user.ID_USER) {
                            result = "Ce pseudonyme est déjà utilisé par un autre utilisateur"
                        }
                    }
                })
        }

        return result;
    }

    //Permet de chiffrer les données avant l'envoi dans la base de données
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

    //Permet de déchiffre les données venant de la base de données
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