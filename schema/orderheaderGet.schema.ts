//Documentation du schéma En-têtes de commandes
/**
 * @swagger
 * components:
 *   schemas:
 *     OrderHeaderGet:
 *       type: object
 *       properties:
 *         ID_ORDER_HEADER:
 *           type: int
 *           description: ID de l'en-tête de commande (Auto généré)
 *         ID_ORDER_STATUS:
 *           type: int
 *           description: ID du status de la commande
 *         ID_USER:
 *           type: int
 *           description: ID de l'utilisateur
 *         DATE:
 *           type: int
 *           description: Date de création de l'en-tête de commande
 *         OWNER:
 *           type: object
 *           properties:
 *             ID_USER:
 *               type: int
 *               description: ID de l'utilisateur ayant rédigé la note
 *             PSEUDONYM:
 *               type: string
 *               description: Pseudonyme de l'utilisateur ayant rédigé la note
 *         ORDER_STATUS:
 *           type: object
 *           properties:
 *             ID_ORDER_STATUS:
 *               type: int
 *               description: ID du status de la commande
 *             WORDING:
 *               type: string
 *               description: Description du statut de la commande
 *       example:
 *         ID_ORDER_HEADER : 1
 *         ID_ORDER_STATUS : 1
 *         ID_USER : 1
 *         ID_TYPE_VITRINE : 2022-01-01
 *         OWNER: {
 *           ID_USER: 1,
 *           PSEUDONYM: Marc_Dupont
 *         }
 *         ORDER_STATUS: {
 *           ID_ORDER_STATUS: 1,
 *           WORDING: "Réservation"
 *         }
 */