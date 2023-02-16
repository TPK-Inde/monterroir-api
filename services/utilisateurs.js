const db = require('../models/db');
const Utilisateur = db.utilisateurs;
const config = require('../config');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

//Fonction permettant de récupérer la liste de tous les utilisateurs
exports.findAll = (req, res) => {
    const numPage = req.query.page || 1;

    //On renvoi un maximum de X utilisateurs (X = config.listPerPage)
    Utilisateur.findAll({limit: parseInt(config.listPerPage), offset: parseInt((numPage - 1) * config.listPerPage)})
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message ||  "Une erreur c'est produite lors de la récupération de tous les utilisateurs"
        });
    })
}

//Fonction permettant de récupérer un utilisateur via son ID
exports.findOne = (req, res) => {
    const idUser = req.params.id;

    Utilisateur.findByPk(idUser)
    .then(data => {
        if (data){
            res.status(200).send(data);
        }
        else{
            res.status(204).send();
        }        
    })
    .catch(err => {
        res.status(500).send({
            message: err.message ||  "Une erreur s'est produite lors de la récupération d'un utilisateur"
        });
    })
}

//Fonction permettant de retourner un booléan si l'identifiant et mot de passe valide
exports.authUser = (req, res) => {
    const donneesUtilisateur = {       
        ADRESSE_EMAIL: req.body.ADRESSE_EMAIL,
        MOT_DE_PASSE: req.body.MOT_DE_PASSE
    };    

    Utilisateur.findOne({ where : { ADRESSE_EMAIL: donneesUtilisateur.ADRESSE_EMAIL }})
    .then(async data => {
        if (data){
            if (await validateUser(donneesUtilisateur.MOT_DE_PASSE, data.MOT_DE_PASSE)){
                let token = await generateAccessToken(data);

                res.status(200).send({ resultat: true, message : "Authentification réussit", token : token });
            }
            else{
                res.status(200).send({ resultat: false, message : "Authentification non valide" });
            }            
        }
        else{
            res.status(400).send({ resultat: false, message : "Aucun utilisateur trouvé avec cette adresse email" });
        }        
    })
    .catch(err => {
        res.status(500).send({
            message: err.message ||  "Une erreur s'est produite lors de la récupération d'un utilisateur"
        });
    })
}

//Fonction d'ajout d'un utilisateur
exports.addOne = async (req, res) => {
    const donneesUtilisateur = {
        ID_UTILISATEUR: null,        
        ID_STATUT_COMPTE: 1, // Pour la création du compte, ID du statut correspond au libellé "Utilisateur"
        PSEUDONYME: req.body.PSEUDONYME,
        NOM: req.body.NOM,
        PRENOM: req.body.PRENOM,
        DATE_DE_NAISSANCE: req.body.DATE_DE_NAISSANCE,
        ADRESSE_EMAIL: req.body.ADRESSE_EMAIL,
        ADRESSE_RUE: req.body.ADRESSE_RUE,
        ADRESSE_CODE_POSTAL: req.body.ADRESSE_CODE_POSTAL,
        ADRESSE_VILLE: req.body.ADRESSE_VILLE,
        MOT_DE_PASSE: req.body.MOT_DE_PASSE.length > 8 ? await hashPassword(req.body.MOT_DE_PASSE) : "",
        PHOTO_DE_PROFIL: req.body.PHOTO_DE_PROFIL
    };    

    console.log(donneesUtilisateur.MOT_DE_PASSE);

    const donneesValide = checkDataIntegrity(donneesUtilisateur);

    if (donneesValide){
        res.status(400).send({
            message: donneesValide
        })
    }
    else{
        Utilisateur.create(donneesUtilisateur)
        .then (data => {
            res.status(201).send({message: "Création de l'utilisateur réussit"});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la création d'un utilisateur"
            });
        })
    }
}

//Fonction de modification d'un utilisateur
exports.update = (req, res) => {
    const idUser = req.params.id;

    if (!idUser){
        res.status(400).send({message: "Veuillez entrer un id utilisateur à modifier"})
    }

    //Todo : Si l'utilisateur n'est pas ADMIN alors la modification de statut de compte n'est pas autorisé

    Utilisateur.findByPk(idUser)
    .then(async data => {
        const donneesUtilisateur = {
            ID_STATUT_COMPTE: req.body.ID_STATUT_COMPTE, //Todo : Si pas admin alors on prend dans data
            PSEUDONYME: req.body.PSEUDONYME,
            NOM: req.body.NOM,
            PRENOM: req.body.PRENOM,
            DATE_DE_NAISSANCE: req.body.DATE_DE_NAISSANCE,
            ADRESSE_EMAIL: req.body.ADRESSE_EMAIL,
            ADRESSE_RUE: req.body.ADRESSE_RUE,
            ADRESSE_CODE_POSTAL: req.body.ADRESSE_CODE_POSTAL,
            ADRESSE_VILLE: req.body.ADRESSE_VILLE,
            MOT_DE_PASSE: req.body.MOT_DE_PASSE.length > 8 ? await hashPassword(req.body.MOT_DE_PASSE) : data.MOT_DE_PASSE, //Si pas de mot de passe alors on change pas
            PHOTO_DE_PROFIL: req.body.PHOTO_DE_PROFIL    
        };
    
        const donneesValide = checkDataIntegrity(donneesUtilisateur);
    
        if (donneesValide){
            res.status(400).send({
                message: donneesValide
            })
        }
        else{
            Utilisateur.update(donneesUtilisateur, { where: { ID_UTILISATEUR: idUser}})
            .then (data => {
                res.status(200).send({message: "Utilisateur mis à jour"});
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Une erreur s'est produite lors de la création d'un utilisateur"
                });
            })
        }
    })
    .catch(err => {
        res.status(400).send({
            message: err.message || "La récupération des données de l'utilisateur avant modification a échouée"
        });
    })    
}

//Fonction de suppression d'un utilisateur
exports.delete = (req, res) => {
    const idUser = req.params.id;

    Utilisateur.destroy({where: {ID_UTILISATEUR: idUser}})
    .then(num => {
        if (num == 1){
            res.send({message: `L'utilisateur id ${idUser} a bien été supprimé`})
        }
        else{
            res.status(400).send({message: `L'utilisateur id ${idUser} n'a pas pu être supprimé, peut-être que cette id n'exite pas ?`})
        }
    })
    .catch(err => {
        console.log("Une erreur c'est produite lors de la suppression d'un utilisateur : " + err.message)
        res.status(500).send({message: `Impossible de supprimer l'utilisateur id ${idUser}`})
    })    
}

//Permet de valider le mot de passe avec le hash en base
function validateUser(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt
        .compare(password, hash)
        .then(res => { resolve(res) })
        .catch(err => { reject(err.message) })
    })        
}

//Fonction pour hashé le mot de passe
function hashPassword(password){
    return new Promise((resolve, reject) => {
        bcrypt
        .hash(password, saltRounds)
        .then(hash => {   
            resolve(hash);
        })
        .catch(err => reject(err.message))
    })    
}

//Fonction permettant de générer un token
function generateAccessToken(donneesUtilisateur) {
    return new Promise((resolve, reject) => {
        resolve(jwt.sign({ "ID_UTILISATEUR" : donneesUtilisateur.ID_UTILISATEUR, "PSEUDONYME" : donneesUtilisateur.PSEUDONYME }, config.token_secret, { expiresIn: config.token_life }))
    })
  }

//Fonction permettant la vérification de l'intégrité des données avant ajout ou modification en BDD
function checkDataIntegrity(donneesUtilisateur){
    if (!donneesUtilisateur.PSEUDONYME) {return "Veuillez entrer un pseudonyme"}
    if (!donneesUtilisateur.NOM) {return "Veuillez entrer un nom de famille"}
    if (!donneesUtilisateur.PRENOM) {return "Veuillez entrer un prénom"}
    if (!donneesUtilisateur.DATE_DE_NAISSANCE) {return "Veuillez entrer une date de naissance"}
    if (!donneesUtilisateur.ADRESSE_EMAIL) {return "Veuillez entrer une adresse email"}
    if (!donneesUtilisateur.ADRESSE_RUE) {return "Veuillez entrer la rue de votre adresse"}
    if (!donneesUtilisateur.ADRESSE_CODE_POSTAL) {return "Veuillez entrer le code postal de votre adresse"}
    if (!donneesUtilisateur.ADRESSE_VILLE) {return "Veuillez entrer la ville de votre adresse"}
    if (!donneesUtilisateur.MOT_DE_PASSE) {return "Votre mot de passe est vide ou ne respecte pas le minimum sécurité"}
    if (!donneesUtilisateur.PHOTO_DE_PROFIL) {return "Veuillez entrer une photo de profil"}
    return null;    
}