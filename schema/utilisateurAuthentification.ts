//Documentation du schéma Utilisateur
/**
 * @swagger
 * components:
 *   schemas:
 *     UtilisateurAuthentification:
 *       type: object
 *       required:
 *         - EMAIL
 *         - PASSWORD
 *       properties:
 *         EMAIL:
 *           type: string
 *           description: Adresse email de l'utilisateur
 *         PASSWORD:
 *           type: string
 *           description: Mot de passe
 *       example:
 *         EMAIL: "joe.doe@exemple.com" 
 *         PASSWORD: "MonSuperMotDePasse"
 */