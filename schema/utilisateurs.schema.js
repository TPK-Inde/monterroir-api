//Documentation du schéma Utilisateur
/**
 * @swagger
 * components:
 *   schemas:
 *     Utilisateur:
 *       type: object
 *       required:
 *         - PSEUDONYME
 *         - NOM
 *         - PRENOM
 *         - DATE_DE_NAISSANCE
 *         - ADRESSE_EMAIL
 *         - ADRESSE_RUE
 *         - ADRESSE_CODE_POSTAL
 *         - ADRESSE_VILLE
 *         - MOT_DE_PASSE
 *       properties:
 *         ID_UTILISATEUR:
 *           type: int
 *           description: ID de l'utilisateur auto-généré
 *         ID_STATUT_COMPTE:
 *           type: int
 *           description: ID du statut du compte
 *         PSEUDONYME:
 *           type: string
 *           description: Pseudo de l'utilisateur 
 *         NOM:
 *           type: string
 *           description: Nom de famille de l'utilisateur
 *         PRENOM:
 *           type: string
 *           description: Prénom de l'utilisateur
 *         DATE_DE_NAISSANCE:
 *           type: date
 *           description: Date de naissance de l'utilisateur
 *         ADRESSE_EMAIL:
 *           type: string
 *           format: Adresse email de l'utilisateur
 *           description: The date the book was added
 *         ADRESSE_RUE:
 *           type: string
 *           description: Rue de l'adresse de l'utilisateur
 *         ADRESSE_CODE_POSTAL:
 *           type: string
 *           description: Code postal de l'adresse de l'utilisateur
 *         ADRESSE_VILLE:
 *           type: string
 *           description: Ville de l'adresse de l'utilisateur=
 *         MOT_DE_PASSE:
 *           type: string
 *           description: Mot de passe de l'utilisateur (BCRYPT)
 *         PHOTO_DE_PROFIL:
 *           type: text
 *           description: Photo de profil de l'utilisateur BASE 64
 *       example:
 *         ID_UTILISATEUR : 1
 *         ID_STATUT_COMPTE : 1 
 *         NOM : "Dupond"
 *         PRENOM : "Marc"
 *         DATE_DE_NAISSANCE : 1995-03-10
 *         ADRESSE_EMAIL : "marc.dupond@exemple.com"
 *         ADRESSE_RUE : "14 Rue du Général"
 *         ADRESSE_CODE_POSTAL : "76600"
 *         ADRESSE_VILLE : "Le Havre"
 *         MOT_DE_PASSE : $2y$10$Q.p48L9fqccoLUXAoUBUKuneke1h8AnXECEBL9/ahfne2xb9hDzxi
 *         PHOTO_DE_PROFIL : "image/2023/12/example.png"
 */