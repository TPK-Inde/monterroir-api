//Documentation du schéma Utilisateur
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - PSEUDONYM
 *         - LAST_NAME
 *         - FIRST_NAME
 *         - EMAIL
 *         - PASSWORD
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
 *           description: Ville de l'adresse de l'utilisateur=
 *         PASSWORD:
 *           type: string
 *           description: Mot de passe de l'utilisateur (BCRYPT)
 *         PROFIL_PICTURE:
 *           type: text
 *           description: Photo de profil de l'utilisateur BASE 64
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
 *         PASSWORD : $2y$10$Q.p48L9fqccoLUXAoUBUKuneke1h8AnXECEBL9/ahfne2xb9hDzxi
 *         PROFIL_PICTURE : "image/2023/12/example.png"
 */