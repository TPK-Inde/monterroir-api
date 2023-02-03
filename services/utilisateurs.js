const db = require('../models/db');
const Utilisateur = db.utilisateurs;
const config = require('../config');

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
            message: err.message ||  "Une erreur c'est produite lors de la récupération d'un utilisateur"
        });
    })
}

//Fonction d'ajout d'un utilisateur
exports.addOne = (req, res) => {
    const donneesUtilisateur = {
        ID_UTILISATEUR: null,        
        ID_STATUT_COMPTE: 1, // Pour la création du compte, ID du statut correspond au libellé "Utilisateur"
        NOM: req.body.NOM,
        PRENOM: req.body.PRENOM,
        DATE_DE_NAISSANCE: req.body.DATE_DE_NAISSANCE,
        ADRESSE_EMAIL: req.body.ADRESSE_EMAIL,
        ADRESSE_RUE: req.body.ADRESSE_RUE,
        ADRESSE_CODE_POSTAL: req.body.ADRESSE_CODE_POSTAL,
        ADRESSE_VILLE: req.body.ADRESSE_VILLE,
        MOT_DE_PASSE: req.body.MOT_DE_PASSE,
        PHOTO_DE_PROFIL: req.body.PHOTO_DE_PROFIL

    };

    const donneesValide = verificationIntegriteDonnees(donneesUtilisateur);

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
                message: err.message || "Une erreur c'est produite lors de la création d'un utilisateur"
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

    Utilisateur.findByPk(idUser)
    .then(data => {
        const donneesUtilisateur = {
            NOM: req.body.NOM,
            PRENOM: req.body.PRENOM,
            DATE_DE_NAISSANCE: req.body.DATE_DE_NAISSANCE,
            ADRESSE_EMAIL: req.body.ADRESSE_EMAIL,
            ADRESSE_RUE: req.body.ADRESSE_RUE,
            ADRESSE_CODE_POSTAL: req.body.ADRESSE_CODE_POSTAL,
            ADRESSE_VILLE: req.body.ADRESSE_VILLE,
            MOT_DE_PASSE: req.body.MOT_DE_PASSE,
            PHOTO_DE_PROFIL: req.body.PHOTO_DE_PROFIL    
        };
    
        const donneesValide = verificationIntegriteDonnees(donneesUtilisateur);
    
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
                    message: err.message || "Une erreur c'est produite lors de la création d'un utilisateur"
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
        res.status(500).send({message: `Impossible de supprimer l'utilisateur id ${idUser}`})
    })
    
}

//Fonction permettant la vérification de l'intégrité des données avant ajout ou modification en BDD
function verificationIntegriteDonnees(donneesUtilisateur){
    if (!donneesUtilisateur.NOM) {return "Veuillez entrer un nom de famille"}
    if (!donneesUtilisateur.PRENOM) {return "Veuillez entrer un prénom"}
    if (!donneesUtilisateur.DATE_DE_NAISSANCE) {return "Veuillez entrer une date de naissance"}
    if (!donneesUtilisateur.ADRESSE_EMAIL) {return "Veuillez entrer une adresse email"}
    if (!donneesUtilisateur.ADRESSE_RUE) {return "Veuillez entrer la rue de votre adresse"}
    if (!donneesUtilisateur.ADRESSE_CODE_POSTAL) {return "Veuillez entrer le code postal de votre adresse"}
    if (!donneesUtilisateur.ADRESSE_VILLE) {return "Veuillez entrer la ville de votre adresse"}
    if (!donneesUtilisateur.MOT_DE_PASSE) {return "Veuillez entrer un mot de passe"}
    if (!donneesUtilisateur.PHOTO_DE_PROFIL) {return "Veuillez entrer une photo de profil"}
    return null;
    
}