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
 *         DATE: 2023-04-14
 *         COMMENT: "Mais c'est que c'est un chouette commentaire ça !"
 */