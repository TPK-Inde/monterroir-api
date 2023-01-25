const express = require('express');
const router = express.Router();
const utilisateurs = require('../services/utilisateurs');

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
router.get('/', async function (req, res, next) {
    try {
        res.json(await utilisateurs.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Une erreur c'est produite lors de la récupéreration de tous les utilisateurs `, err.message);
        next(err);
    }
});

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
router.get('/:id', async function (req, res, next) {
    try {
        const resultat = await utilisateurs.getOne(req.params.id);

        if (resultat.length === 0) {
            res.status(204); //204 = NoContent
        }
        else {
            res.json(resultat);
        }

    } catch (err) {
        console.error(`Une erreur c'est produite lors de la récupéreration d'un utilisateur `, err.message);
        next(err);
    }
});

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
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.post('/', async function (req, res, next) {
    try {
        res.status(201).json(await utilisateurs.ajout(req.body));
    } catch (err) {
        console.error("Une erreur c'est produite lors de la création d'un nouvelle utilisateur", err.message);
        next(err);
    }
});

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
router.put('/:id', async function (req, res, next) {
    try {
        res.json(await utilisateurs.modification(req.params.id, req.body));
    } catch (err) {
        console.error(`Une erreur c'est produite lors de la modification d'un utilisateur`, err.message);
        next(err);
    }
});

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
router.delete('/:id', async function (req, res, next) {
    try {
        res.status(204).json(await utilisateurs.suppression(req.params.id));
    } catch (err) {
        console.error(`Une erreur c'est produite lors de la suppression d'un utilisateur`, err.message);
        next(err);
    }
});

//Documentation du schéma Utilisateur
/**
 * @swagger
 * components:
 *   schemas:
 *     Utilisateur:
 *       type: object
 *       required:
 *         - nom
 *         - prenom
 *         - date_de_naissance
 *         - adresse_email
 *         - adresse_rue
 *         - adresse_code_postal
 *         - adresse_ville
 *         - mot_de_passe
 *       properties:
 *         id:
 *           type: int
 *           description: ID de l'utilisateur auto-généré
 *         nom:
 *           type: string
 *           description: Nom de famille de l'utilisateur
 *         prenom:
 *           type: string
 *           description: Prénom de l'utilisateur
 *         date_de_naissance:
 *           type: date
 *           description: Date de naissance de l'utilisateur
 *         adresse_email:
 *           type: string
 *           format: Adresse email de l'utilisateur
 *           description: The date the book was added
 *         adresse_rue:
 *           type: string
 *           description: Rue de l'adresse de l'utilisateur
 *         adresse_code_postal:
 *           type: string
 *           description: Code postal de l'adresse de l'utilisateur
 *         adresse_ville:
 *           type: string
 *           description: Ville de l'adresse de l'utilisateur
 *         statut:
 *           type: string
 *           description: Statut de l'utilisateur
 *         mot_de_passe:
 *           type: string
 *           description: Mot de passe de l'utilisateur (BCRYPT)
 *         photo_de_profil:
 *           type: string
 *           description: Lien vers l'image de la photo de profil de l'utilisateur
 *       example:
 *         id : 1
 *         nom : "Dupond"
 *         prenom : "Marc"
 *         date_de_naissance : 1995-03-10
 *         adresse_email : "marc.dupond@exemple.com"
 *         adresse_rue : "14 Rue du Général"
 *         adresse_code_postal : "76600"
 *         adresse_ville : "Le Havre"
 *         statut : Utilisateur
 *         mot_de_passe : $2y$10$Q.p48L9fqccoLUXAoUBUKuneke1h8AnXECEBL9/ahfne2xb9hDzxi
 *         photo_de_profil : image/2023/12/example.png
 */

module.exports = router;