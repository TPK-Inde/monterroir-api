//Documentation du schéma Utilisateur
/**
 * @swagger
 * components:
 *   schemas:
 *     UserGetLimited:
 *       type: object
 *       properties:
 *         ID_USER:
 *           type: int
 *           description: ID de l'utilisateur auto-généré
 *         PSEUDONYM:
 *           type: string
 *           description: Pseudo de l'utilisateur 
 *         PROFIL_PICTURE:
 *           type: text
 *           description: Photo de profil de l'utilisateur BASE 64
 *       example:
 *         ID_USER : 1
 *         PSEUDONYM: "Marc_Dupond"
 *         PROFIL_PICTURE : "image/2023/12/example.png"
 */