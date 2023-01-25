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

    return data;
}

//Fonction permettant de récupérer un utilisateur via son ID
async function getOne(id) {
    const rows = await db.query(
        `SELECT * FROM F_UTILISATEURS WHERE ID=${id}`
    );

    return rows;
    
}

//Fonction d'ajour d'un utilisateur
async function ajout(nouvelleUtilisateur) {
    const result = await db.query(
        `INSERT INTO F_UTILISATEURS 
        (NOM, PRENOM, DATE_DE_NAISSANCE, ADRESSE_EMAIL, ADRESSE_RUE, ADRESSE_CODE_POSTAL, ADRESSE_VILLE, STATUT, MOT_DE_PASSE, PHOTO_DE_PROFIL)
        VALUES 
        ('${nouvelleUtilisateur.nom}', '${nouvelleUtilisateur.prenom}', '${nouvelleUtilisateur.date_de_naissance}', '${nouvelleUtilisateur.adresse_rue}', 
        '${nouvelleUtilisateur.adresse_email}', '${nouvelleUtilisateur.adresse_code_postal}', '${nouvelleUtilisateur.adresse_ville}', 
        '${nouvelleUtilisateur.statut}', '${nouvelleUtilisateur.mot_de_passe}', '${nouvelleUtilisateur.photo_de_profil}')`
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
        SET NOM='${utilisateur.nom}', PRENOM='${utilisateur.prenom}', DATE_DE_NAISSANCE='${utilisateur.date_de_naissance}',
        ADRESSE_EMAIL='${utilisateur.adresse_email}', ADRESSE_RUE='${utilisateur.adresse_rue}', ADRESSE_CODE_POSTAL='${utilisateur.adresse_code_postal}',
        ADRESSE_VILLE='${utilisateur.adresse_ville}', STATUT='${utilisateur.statut}', MOT_DE_PASSE='${utilisateur.mot_de_passe}', PHOTO_DE_PROFIL='${utilisateur.photo_de_profil}'
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