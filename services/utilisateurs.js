const db = require('./db');
const helper = require('../helper');
const config = require('../config');

//Fonction permettant de récupérer la liste de tous les utilisateurs
async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * 
      FROM F_UTILISATEURS LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

//Fonction permettant de récupérer un utilisateur via son ID
async function getOne(page = 1, id) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * 
      FROM F_UTILISATEURS WHERE ID=${id} LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

//Fonction d'ajour d'un utilisateur
async function ajout(nouvelleUtilisateur) {
    const result = await db.query(
        `INSERT INTO F_UTILISATEURS 
        (NOM, PRENOM, DATE_DE_NAISSANCE, ADRESSE_EMAIL, ADRESSE_RUE, ADRESSE_CODE_POSTAL, ADRESSE_VILLE, STATUT, MOT_DE_PASSE, PHOTO_DE_PROFIL)
        VALUES 
        ('${nouvelleUtilisateur.NOM}', '${nouvelleUtilisateur.PRENOM}', '${nouvelleUtilisateur.DATE_DE_NAISSANCE}', '${nouvelleUtilisateur.ADRESSE_RUE}', 
        '${nouvelleUtilisateur.ADRESSE_EMAIL}', '${nouvelleUtilisateur.ADRESSE_CODE_POSTAL}', '${nouvelleUtilisateur.ADRESSE_VILLE}', 
        '${nouvelleUtilisateur.STATUT}', '${nouvelleUtilisateur.MOT_DE_PASSE}', '${nouvelleUtilisateur.PHOTO_DE_PROFIL}')`
    );

    let message = "Échec de la création d'une nouvelle utiilisateur";

    if (result.affectedRows) {
        message = "Création du nouvelle utilisateur réussit";
    }

    return { message };
}

//Fonction de modification d'un utilisateur
async function modification(id, utilisateur) {
    const result = await db.query(
        `UPDATE F_UTILISATEURS 
        SET NOM='${utilisateur.NOM}', PRENOM='${utilisateur.PRENOM}', DATE_DE_NAISSANCE='${utilisateur.DATE_DE_NAISSANCE}',
        ADRESSE_EMAIL='${utilisateur.ADRESSE_EMAIL}', ADRESSE_RUE='${utilisateur.ADRESSE_RUE}', ADRESSE_CODE_POSTAL='${utilisateur.ADRESSE_CODE_POSTAL}',
        ADRESSE_VILLE='${utilisateur.ADRESSE_VILLE}', STATUT='${utilisateur.STATUT}', MOT_DE_PASSE='${utilisateur.MOT_DE_PASSE}', PHOTO_DE_PROFIL='${utilisateur.PHOTO_DE_PROFIL}'
        WHERE ID=${id}`
    );

    let message = "Échec de la mise à jour de l'utilisateur";

    if (result.affectedRows) {
        message = "Mise à jour de l'utilisateur réussit";
    }

    return { message };
}

//Fonction de suppression d'un utilisateur
async function suppression(id) {
    const result = await db.query(
        `DELETE FROM F_UTILISATEURS WHERE ID=${id}`
    );

    let message = "Échec de la mise à jour de l'utilisateur";

    if (result.affectedRows) {
        message = "Mise à jour de l'utilisateur réussit";
    }

    return { message };
}

module.exports = {
    getMultiple,
    getOne,
    ajout,
    modification,
    suppression
}