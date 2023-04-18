//Documentation du schéma des commentaires
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - ID_RATE
 *         - ID_USER
 *         - PARENT_ID
 *         - COMMENT
 *         - DATE
 *       properties:
 *         ID_COMMENT:
 *           type: int
 *           description: ID du commentaire autogénéré
 *         ID_RATE:
 *           type: int
 *           description: ID de la note liée au commentaire
 *         ID_USER:
 *           type: string
 *           description: ID de l'utilisateur ayant rédigé le commentaire 
 *         PARENT_ID:
 *           type: string
 *           description: PARENT_ID du commentaire
 *         COMMENT:
 *           type: string
 *           description: Le texte du commentaire
 *         DATE:
 *           type: date
 *           description: Date de l'enregistrement du commentaire
 *       example:
 *         ID_COMMENT : 1
 *         ID_RATE : 1
 *         ID_USER: 1
 *         PARENT_ID : 1
 *         COMMENT : "Une superbe vitrine, avec des légumes exceptionnels !"
 *         DATE : 2023-04-14
 */