const express = require('express');
const router = express.Router();
const utilisateurs = require('../services/utilisateurs.js');

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: CRUD utilisateur
 * /utilisateurs:
 *   get:
 *     summary: Permet de récupérer la liste des utilisateurs, (25 retours par page)
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         required: false
 *         description: Le numéro de page (1 par défaut)
 *     responses:
 *       200:
 *         description: La récupération de la liste est réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Utilisateur'
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.get('/', utilisateurs.findAll);

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: CRUD utilisateur
 * /utilisateurs/{id}:
 *   get:
 *     summary: Permet de récupérer un utilisateur en fonction de son ID
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: La récupération d'utilisateur a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Utilisateur'
 *       204:
 *         description: Aucun utilisateur trouvé avec l'ID indiqué
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.get('/:id', utilisateurs.findOne);

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: CRUD utilisateur
 * /utilisateurs/authentification:
 *   post:
 *     summary: Permet de vérifier l'authentification d'un utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UtilisateurAuthentification'
 *     responses:
 *       200:
 *         description: Résultat de l'authentification.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *             example:
 *               -  resultat: true
 *                  message: "Authentification réussit"
 *               -  resultat: false
 *                  message: "Authentification non valide"
 *       400:
 *         description: L'utilisateur n'a pas été trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *             example:
 *               -  resultat: false
 *                  message: "Aucun utilisateur trouvé avec cette adresse email"
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.post('/authentification', utilisateurs.authUser);

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: CRUD utilisateur
 * /utilisateurs:
 *   post:
 *     summary: Permet d'ajouter un nouvelle utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Utilisateur'
 *     responses:
 *       201:
 *         description: L'ajout de l'utilisateur a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Création de l'utilisateur réussit"  
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un nom de famille" 
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.post('/', utilisateurs.addOne);

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: CRUD utilisateur
 * /utilisateurs/{id}:
 *   put:
 *     summary: Permet de modifier un utilisateur en fonction de son ID
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Utilisateur'
 *     responses:
 *       200:
 *         description: La modification de l'utilisateur a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Utilisateur mis à jour"
 *       204:
 *         description: Aucun utilisateur trouvé avec l'ID indiqué
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un nom de famille" 
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.put('/:id', utilisateurs.update);

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: CRUD utilisateur
 * /utilisateurs/{id}:
 *   delete:
 *     summary: Permet de supprimer un utilisateur en fonction de son ID
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: La suppression de l'utilisateur a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "L'utilisateur id 1 n'a pas pu être supprimé, peut-être que cette id n'exite pas ?" 
 *       400:
 *         description: Quelque chose a empêché la suppression de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un nom de famille"                
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.delete('/:id', utilisateurs.delete);

//Documentation du schéma Utilisateur
/**
 * @swagger
 * components:
 *   schemas:
 *     Utilisateur:
 *       type: object
 *       required:
 *         - PSEUDONYME
 *         - NOM
 *         - PRENOM
 *         - DATE_DE_NAISSANCE
 *         - ADRESSE_EMAIL
 *         - ADRESSE_RUE
 *         - ADRESSE_CODE_POSTAL
 *         - ADRESSE_VILLE
 *         - MOT_DE_PASSE
 *       properties:
 *         ID_UTILISATEUR:
 *           type: int
 *           description: ID de l'utilisateur auto-généré
 *         ID_STATUT_COMPTE:
 *           type: int
 *           description: ID du statut du compte
 *         PSEUDONYME:
 *           type: string
 *           description: Pseudo de l'utilisateur 
 *         NOM:
 *           type: string
 *           description: Nom de famille de l'utilisateur
 *         PRENOM:
 *           type: string
 *           description: Prénom de l'utilisateur
 *         DATE_DE_NAISSANCE:
 *           type: date
 *           description: Date de naissance de l'utilisateur
 *         ADRESSE_EMAIL:
 *           type: string
 *           format: Adresse email de l'utilisateur
 *           description: The date the book was added
 *         ADRESSE_RUE:
 *           type: string
 *           description: Rue de l'adresse de l'utilisateur
 *         ADRESSE_CODE_POSTAL:
 *           type: string
 *           description: Code postal de l'adresse de l'utilisateur
 *         ADRESSE_VILLE:
 *           type: string
 *           description: Ville de l'adresse de l'utilisateur=
 *         MOT_DE_PASSE:
 *           type: string
 *           description: Mot de passe de l'utilisateur (BCRYPT)
 *         PHOTO_DE_PROFIL:
 *           type: text
 *           description: Photo de profil de l'utilisateur BASE 64
 *       example:
 *         ID_UTILISATEUR : 1
 *         ID_STATUT_COMPTE : 1 
 *         NOM : "Dupond"
 *         PRENOM : "Marc"
 *         DATE_DE_NAISSANCE : 1995-03-10
 *         ADRESSE_EMAIL : "marc.dupond@exemple.com"
 *         ADRESSE_RUE : "14 Rue du Général"
 *         ADRESSE_CODE_POSTAL : "76600"
 *         ADRESSE_VILLE : "Le Havre"
 *         MOT_DE_PASSE : $2y$10$Q.p48L9fqccoLUXAoUBUKuneke1h8AnXECEBL9/ahfne2xb9hDzxi
 *         PHOTO_DE_PROFIL : "image/2023/12/example.png"
 *     UtilisateurAuthentification:
 *       type: object
 *       required:
 *         - ADRESSE_EMAIL
 *         - MOT_DE_PASSE
 *       properties:
 *         ADRESSE_EMAIL:
 *           type: string
 *           description: Adresse email de l'utilisateur
 *         MOT_DE_PASSE:
 *           type: string
 *           description: Mot de passe
 *       example:
 *         ADRESSE_EMAIL: "joe.doe@exemple.com" 
 *         MOT_DE_PASSE: "MonSuperMotDePasse"
 *     Message:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message de retour 
 *     MessageAvecBoolean:
 *       type: object
 *       properties:
 *         resultat:
 *           type: boolean
 *           description: Booléan de retour
 *         message:
 *           type: string
 *           description: Message de retour  
 */

module.exports = router;