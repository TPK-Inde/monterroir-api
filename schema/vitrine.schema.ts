//Documentation du schéma Vitrine
/**
 * @swagger
 * components:
 *   schemas:
 *     Vitrine:
 *       type: object
 *       required:
 *         - ID_UTILISATEUR
 *         - ID_CATEGORIE_VITRINE
 *         - ID_TYPE_VITRINE
 *         - NOM
 *         - PHOTO
 *         - ADRESSE_RUE
 *         - ADRESSE_CODE_POSTAL
 *         - ADRESSE_VILLE
 *         - DATE_CREATION
 *         - ACTIF
 *       properties:
 *         ID_VITRINE:
 *           type: int
 *           description: ID de la vitrine (Auto généré)
 *         ID_UTILISATEUR:
 *           type: int
 *           description: ID de l'utilisateur propriétaire de la vitrine
 *         ID_CATEGORIE_VITRINE:
 *           type: int
 *           description: ID de la catégorie de la vitrine
 *         ID_TYPE_VITRINE:
 *           type: int
 *           description: ID du type de la vitrine
 *         NOM:
 *           type: string
 *           description: Nom de la vitrine
 *         PHOTO:
 *           type: string
 *           description: Photo de la vitrine (en base 64)
 *         ADRESSE_RUE:
 *           type: string
 *           description: Rue de l'adresse de l'utilisateur
 *         ADRESSE_CODE_POSTAL:
 *           type: string
 *           description: Code postal de l'adresse de l'utilisateur
 *         ADRESSE_VILLE:
 *           type: string
 *           description: Ville de l'adresse de l'utilisateur=
 *         DATE_CREATION:
 *           type: date
 *           description: Date de création de la vitrine
 *         ACTIF:
 *           type: boolean
 *           description: Champ permettant de déterminer si une vitrine est activé ou non
 *       example:
 *         ID_VITRINE : 1
 *         ID_UTILISATEUR : 1
 *         ID_CATEGORIE_VITRINE : 1
 *         ID_TYPE_VITRINE : 1
 *         NOM : "Les choux de la ferme"
 *         PHOTO : "IMAGE_BASE_64"
 *         ADRESSE_RUE : "14 Rue du Général"
 *         ADRESSE_CODE_POSTAL : "76600"
 *         ADRESSE_VILLE : "Le Havre"
 *         DATE_CREATION : 2022-01-01
 *         ACTIF : true
 */