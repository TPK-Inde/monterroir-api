//Documentation du schéma Vitrine
/**
 * @swagger
 * components:
 *   schemas:
 *     VitrineGet:
 *       type: object
 *       properties:
 *         ID_VITRINE:
 *           type: int
 *           description: ID de la vitrine (Auto généré)
 *         ID_USER:
 *           type: int
 *           description: ID de l'utilisateur propriétaire de la vitrine
 *         ID_CATEGORY_VITRINE:
 *           type: int
 *           description: ID de la catégorie de la vitrine
 *         ID_TYPE_VITRINE:
 *           type: int
 *           description: ID du type de la vitrine
 *         NAME:
 *           type: string
 *           description: Nom de la vitrine
 *         IMAGE:
 *           type: string
 *           description: Photo de la vitrine (en base 64)
 *         ADDRESS_STREET:
 *           type: string
 *           description: Rue de l'adresse de l'utilisateur
 *         ADDRESS_ZIP_CODE:
 *           type: string
 *           description: Code postal de l'adresse de l'utilisateur
 *         ADDRESS_CITY:
 *           type: string
 *           description: Ville de l'adresse de l'utilisateur=
 *         CREATION_DATE:
 *           type: date
 *           description: Date de création de la vitrine
 *         DESCRIPTION:
 *           type: string
 *           description: Description de la vitrine
 *         ACTIVATE:
 *           type: boolean
 *           description: Champ permettant de déterminer si une vitrine est activé ou non
 *         LATITUDE:
 *           type: double
 *           description: Latitude de l'emplacement de la vitrine
 *         LONGITUDE:
 *           type: double
 *           description: Longitude de l'emplacement de la vitrine
 *         OWNER:
 *           type: object
 *           properties:
 *             ID_USER:
 *               type: int
 *               description: ID de l'utilisateur ayant rédigé la note
 *             PSEUDONYM:
 *               type: string
 *               description: Pseudonyme de l'utilisateur ayant rédigé la note
 *         TYPE_VITRINE:
 *           type: object
 *           properties:
 *             ID_TYPE_VITRINE:
 *               type: int
 *               description: ID du type de la vitrine
 *             WORDING:
 *               type: string
 *               description: Libellé
 *         CATEGORY_VITRINE:
 *           type: object
 *           properties:
 *             ID_CATEGORY_VITRINE:
 *               type: int
 *               description: ID de la catégorie de vitrine
 *             WORDING:
 *               type: string
 *               description: Libellé
 *         IS_FAVORITE:
 *           type: boolean
 *           description: Détermine si la vitrine est au favori
 *       example:
 *         ID_VITRINE : 1
 *         ID_USER : 1
 *         ID_CATEGORY_VITRINE : 1
 *         ID_TYPE_VITRINE : 1
 *         NAME : "Les choux de la ferme"
 *         IMAGE : "IMAGE_BASE_64"
 *         ADDRESS_STREET : "14 Rue du Général"
 *         ADDRESS_ZIP_CODE : "76600"
 *         ADDRESS_CITY : "Le Havre"
 *         DESCRIPTION : "Vendeur de choux depuis 10 ans"
 *         CREATION_DATE : 2022-01-01
 *         ACTIVATE : true
 *         LATITUDE : 48.866667
 *         LONGITUDE : 2.333333
 *         OWNER: {
 *           ID_USER: 1,
 *           PSEUDONYM: "Marc_Dupont"
 *         }
 *         TYPE_VITRINE: {
 *           ID_TYPE_VITRINE: 1,
 *           WORDING: "Classique"
 *         }
 *         CATEGORY_VITRINE: {
 *           ID_CATEGORY_VITRINE: 1,
 *           WORDING: "Poterie"
 *         }
 *         IS_FAVORITE: false
 */