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
 *         description: Le numéro de page (Par défaut, il vaut 1)
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
 *         description: La modification de l'utilisateur a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Utilisateur'
 *       400:
 *         description: Un élément est manquant dans la requête
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
 *               $ref: '#/components/schemas/Utilisateur'
 *       204:
 *         description: Aucun utilisateur trouvé avec l'ID indiqué
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
 *       204:
 *         description: La suppression de l'utilisateur a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Utilisateur'
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
 */

module.exports = router;