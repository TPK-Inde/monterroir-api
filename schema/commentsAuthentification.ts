//Documentation du schéma Commentaires
/**
 * @swagger
 * components:
 *   schemas:
 *     CommentsAuthentification:
 *       type: object
 *       required:
 *         - ID_RATE
 *         - ID_USER
 *         - ID_PARENT
 *         - DATE
 *         - COMMENT
 *       properties:
 *         ID_RATE:
 *           type: number
 *           description: id de la note atttaché à ce commentaire
 *         ID_USER:
 *           type: number
 *           description: id de l'utilisateur atttaché à ce commentaire
 *         ID_PARENT:
 *            type: number
 *            description: id d'un truc
 *         DATE:
 *           type: Date
 *           description: date du commentaire
 *         COMMENT:
 *            type: string
 *            description: le commentaire 
 *       example:
 *         ID_RATE: 1
 *         ID_USER: 1
 *         ID_PARENT: 1
 *         DATE: Tue Feb 05 2019 12:05:22 GMT+0530 (IST)
 *         COMMENT: "Mais c'est que c'est un chouette commentaire ça !"
 */