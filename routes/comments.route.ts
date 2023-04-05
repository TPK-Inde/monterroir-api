import express from 'express';

const router = express.Router();
const commentsService = require('../services/comments.ts');
const jwAuthentification = require("../middleware/jwtAuthentification");

/**
 * @swagger
 * tags:
 *  name: Commentaires
 *  description: CRUD Commentaires
 * /comments:
 *   get:
 *     summary: Permet de récupérer tous les commentaires
 *     tags: [Commentaires]
 *     responses:
 *       200:
 *         description: La récupération des commentaires a réussie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       204:
 *         description: Aucun commentaire trouvé avec l'ID indiqué
 *       401:
 *         description: Token vide ou invalide
 *       403:
 *         description: Token expiré ou pas les droits nécessaires
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               -  message: "Le token a expiré"
 *               -  message: "Vous ne disposez pas des droits pour effectuer cette action"
 *       500:
 *         description: Erreur du serveur interne
 * 
 */
router.get('/', commentsService.GetAll);

/**
 * @swagger
 * tags:
 *  name: Commentaires
 *  description: CRUD Commentaires
 * /comments/{ID}:
 *   get:
 *     summary: Permet de récupérer le commentaire en fonction de son ID
 *     tags: [Commentaires]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: La récupération des commentaires a réussie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       204:
 *         description: Aucun commentaire trouvé avec l'ID indiqué
 *       401:
 *         description: Token vide ou invalide
 *       403:
 *         description: Token expiré ou pas les droits nécessaires
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               -  message: "Le token a expiré"
 *               -  message: "Vous ne disposez pas des droits pour effectuer cette action"
 *       500:
 *         description: Erreur du serveur interne
 * 
 */
router.get('/:ID', commentsService.GetById);


/**
 * @swagger
 * tags:
 *  name: Commentaires
 *  description: CRUD Commentaires
 * /comments/user/{ID_USER}:
 *   get:
 *     summary: Permet de récupérer le commentaire en fonction de l'ID de son utilisateur
 *     tags: [Commentaires]
 *     parameters:
 *       - in: path
 *         name: ID_USER
 *         schema:
 *           type: string
 *         required: true
 *         description: commentaires de l'utilisateur en fonction de son ID
 *     responses:
 *       200:
 *         description: La récupération des commentaires a réussie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       204:
 *         description: Aucun commentaire trouvé avec l'ID indiqué
 *       401:
 *         description: Token vide ou invalide
 *       403:
 *         description: Token expiré ou pas les droits nécessaires
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               -  message: "Le token a expiré"
 *               -  message: "Vous ne disposez pas des droits pour effectuer cette action"
 *       500:
 *         description: Erreur du serveur interne
 * 
 */
router.get('/user/:ID_USER', commentsService.GetUserComments);


/**
 * @swagger
 * tags:
 *   name: Commentaires
 *   description: CRUD commentaire
 * /comments/authentification:
 *   post:
 *     summary: Permet de poster un nouveau commentaire
 *     tags: [Commentaires]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CommentsAuthentification'
 *     responses:
 *       204:
 *         description: Envoi réussit d'un nouveau commentaire.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *       400:
 *         description: Echec lors de l'enregistrement du commentaire.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *             example:
 *               -  resultat: false
 *                  message: "Echec lors de l'enregistrement du commentaire"
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.post('/authentification', commentsService.PostNewComment)


/**
 * @swagger
 * tags:
 *   name: Commentaires
 *   description: CRUD commentaire
 * /comments/{ID_COMMENT}:
 *   put:
 *     summary: Permet de poster un nouveau commentaire
 *     tags: [Commentaires]
 *     parameters:
 *       - in: path
 *         name: ID_COMMENT
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du commentaire à changer
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CommentsAuthentification'
 *     responses:
 *       204:
 *         description: Envoi réussit d'un nouveau commentaire.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *       400:
 *         description: Echec lors de l'enregistrement du commentaire.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *             example:
 *               -  resultat: false
 *                  message: "Echec lors de l'enregistrement du commentaire"
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.put('/:ID_COMMENT', commentsService.PutComment)

/**
 * @swagger
 * tags:
 *   name: Commentaires
 *   description: CRUD commentaires
 * /comments/{ID_COMMENT}:
 *   delete:
 *     summary: Permet de supprimer un utilisateur en fonction de son ID
 *     tags: [Commentaires]
 *     parameters:
 *       - in: path
 *         name: ID_COMMENT
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du commentaire
 *     responses:
 *       200:
 *         description: La suppression du commentaire a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La suppression du commentaire a réussit." 
 *       400:
 *         description: Quelque chose a empêché la suppression de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Le commentaire d'id 1 n'a pas pu être supprimé, peut-être que cette id n'exite pas ?"  
 *       401:
 *         description: Token vide ou invalide
 *       403:
 *         description: Token expiré ou pas les droits nécessaires
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               -  message: "Le token a expiré"
 *               -  message: "Vous ne disposez pas des droits pour effectuer cette action"              
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.delete('/:ID_COMMENT', commentsService.DeleteComment); 


module.exports = router;