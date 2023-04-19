//Documentation du schéma En-têtes de commandes
/**
 * @swagger
 * components:
 *   schemas:
 *     OrderHeader:
 *       type: object
 *       required:
 *         - ID_ORDER_HEADER
 *         - ID_ORDER_STATUS
 *         - ID_USER
 *         - DATE
 *       properties:
 *         ID_ORDER_HEADER:
 *           type: int
 *           description: ID de l'en-tête de commande (Auto généré)
 *         ID_ORDER_STATUS:
 *           type: int
 *           description: ID du status de la commande
 *         ID_USER:
 *           type: int
 *           description: ID de l'utilisateur propriétaire de la vitrine
 *         DATE:
 *           type: int
 *           description: Date de création de l'en-tête de commande
 *       example:
 *         ID_ORDER_HEADER : 1
 *         ID_ORDER_STATUS : 1
 *         ID_USER : 1
 *         ID_TYPE_VITRINE : 2022-01-01
 */