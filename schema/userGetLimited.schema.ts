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
 *         ACCOUNT_STATUS:
 *           type: object
 *           properties:
 *             ID_ACCOUNT_STATUS:
 *               type: int
 *               description: ID du statut du compte
 *             WORDING:
 *               type: string
 *               description: Libellé du statut du compte
 *       example:
 *         ID_USER : 1
 *         PSEUDONYM: "Marc_Dupond"
 *         PROFIL_PICTURE : "image/2023/12/example.png"
 *         ACCOUNT_STATUS: {
 *           ID_ACCOUNT_STATUS: 1,
 *           WORDING: "Utilisateur"
 *         }
 */