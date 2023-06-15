//Documentation du schéma Utilisateur
/**
 * @swagger
 * components:
 *   schemas:
 *     UserGet:
 *       type: object
 *       properties:
 *         ID_USER:
 *           type: int
 *           description: ID de l'utilisateur auto-généré
 *         ID_ACCOUNT_STATUS:
 *           type: int
 *           description: ID du statut du compte
 *         PSEUDONYM:
 *           type: string
 *           description: Pseudo de l'utilisateur 
 *         LAST_NAME:
 *           type: string
 *           description: Nom de famille de l'utilisateur
 *         FIRST_NAME:
 *           type: string
 *           description: Prénom de l'utilisateur
 *         DATE_OF_BIRTH:
 *           type: date
 *           description: Date de naissance de l'utilisateur
 *         EMAIL:
 *           type: string
 *           description: Adresse email de l'utilisateur
 *         ADDRESS_STREET:
 *           type: string
 *           description: Rue de l'adresse de l'utilisateur
 *         ADDRESS_ZIP_CODE:
 *           type: string
 *           description: Code postal de l'adresse de l'utilisateur
 *         ADDRESS_CITY:
 *           type: string
 *           description: Ville de l'adresse de l'utilisateur
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
 *         ID_ACCOUNT_STATUS : 1
 *         PSEUDONYM: "Marc_Dupond"
 *         LAST_NAME : "Dupond"
 *         FIRST_NAME : "Marc"
 *         DATE_OF_BIRTH : 1995-03-10
 *         EMAIL : "marc.dupond@exemple.com"
 *         ADDRESS_STREET : "14 Rue du Général"
 *         ADDRESS_ZIP_CODE : "76600"
 *         ADDRESS_CITY : "Le Havre"
 *         PROFIL_PICTURE : "image/2023/12/example.png"
 *         ACCOUNT_STATUS: {
 *           ID_ACCOUNT_STATUS: 1,
 *           WORDING: "Utilisateur"
 *         }
 */