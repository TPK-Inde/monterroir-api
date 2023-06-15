import express from 'express';
import Comments from '../services/comments';
import JwtAuthentification from "../middleware/jwtAuthentification";

const router = express.Router();
const commentsService = new Comments();
const jwtAuthentification = new JwtAuthentification();

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
 *               $ref: '#/components/schemas/CommentGet'
 *       204:
 *         description: Aucun commentaire n'est présent dans la base de données
 *       500:
 *         description: Erreur du serveur interne
 * 
 */
router.get('/', commentsService.GetAll.bind(commentsService));

/**
 * @swagger
 * tags:
 *  name: Commentaires
 *  description: CRUD Commentaires
 * /comments/{ID_COMMENT}:
 *   get:
 *     summary: Permet de récupérer le commentaire en fonction de son ID
 *     tags: [Commentaires]
 *     parameters:
 *       - in: path
 *         name: ID_COMMENT
 *         schema:
 *           type: int
 *         required: true
 *         description: ID du commentaire
 *     responses:
 *       200:
 *         description: La récupération des commentaires a réussie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentGet'
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
router.get('/:ID_COMMENT', commentsService.GetById.bind(commentsService));


/**
 * @swagger
 * tags:
 *  name: Commentaires
 *  description: CRUD Commentaires
 * /comments/vitrine/{ID_VITRINE}:
 *   get:
 *     summary: Permet de récupérer tous les commentaires affiliés à une vitrine reconnue
 *     tags: [Commentaires]
 *     parameters:
 *       - in: path
 *         name: ID_VITRINE
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la vitrine
 *     responses:
 *       200:
 *         description: La récupération des commentaires a réussie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/comments.schema'
 *       204:
 *         description: Aucun commentaire n'est présent dans la base de données
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un ID valide"
 *       500:
 *         description: Erreur du serveur interne
 * 
 */
router.get('/vitrine/:ID_VITRINE', commentsService.GetVitrineComments.bind(commentsService));

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
 *           type: int
 *         required: true
 *         description: commentaires de l'utilisateur en fonction de son ID
 *     responses:
 *       200:
 *         description: La récupération des commentaires a réussie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentGet'
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
router.get('/user/:ID_USER', commentsService.GetUserComments.bind(commentsService));


/**
 * @swagger
 * tags:
 *   name: Commentaires
 *   description: CRUD commentaire
 * /comments:
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
router.post(
  '/',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  commentsService.PostNewComment.bind(commentsService)
)


/**
 * @swagger
 * tags:
 *   name: Commentaires
 *   description: CRUD commentaire
 * /comments/{ID_COMMENT}:
 *   put:
 *     summary: Permet de modifier un commentaire
 *     tags: [Commentaires]
 *     parameters:
 *       - in: path
 *         name: ID_COMMENT
 *         schema:
 *           type: integer
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
 *         description: Echec lors de la modification du commentaire.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *             example:
 *               -  resultat: false
 *                  message: "Echec lors de la modification du commentaire"
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.put(
  '/:ID_COMMENT',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  commentsService.PutComment.bind(commentsService)
)

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
 *           type: integer
 *         required: true
 *         description: ID du commentaire
 *     responses:
 *       200:
 *         description: La suppression du commentaire a réussie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La suppression du commentaire a réussie." 
 *       400:
 *         description: Quelque chose a empêché la suppression du commentaire
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Le commentaire d'id 1 n'a pas pu être supprimé, peut-être que cette id n'exite pas ?"             
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.delete(
  '/:ID_COMMENT',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  commentsService.DeleteComment.bind(commentsService)
);


module.exports = router;