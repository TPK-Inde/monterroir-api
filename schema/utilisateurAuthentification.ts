//Documentation du schéma Utilisateur
/**
 * @swagger
 * components:
 *   schemas:
 *     UtilisateurAuthentification:
 *       type: object
 *       required:
 *         - ADRESSE_EMAIL
 *         - MOT_DE_PASSE
 *       properties:
 *         ADRESSE_EMAIL:
 *           type: string
 *           description: Adresse email de l'utilisateur
 *         MOT_DE_PASSE:
 *           type: string
 *           description: Mot de passe
 *       example:
 *         ADRESSE_EMAIL: "joe.doe@exemple.com" 
 *         MOT_DE_PASSE: "MonSuperMotDePasse"
 */