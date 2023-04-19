//Documentation du schéma ligne de commandes
/**
 * @swagger
 * components:
 *   schemas:
 *     OrderLine:
 *       type: object
 *       required:
 *         - ID_ORDER_LINE
 *         - ID_PRODUCT
 *         - ID_ORDER_HEADER
 *         - ORDER_QUANTITY
 *         - PRICE
 *       properties:
 *         ID_ORDER_LINE:
 *           type: int
 *           description: ID de la ligne de commande (Auto généré)
 *         ID_PRODUCT:
 *           type: int
 *           description: ID du produit dans la ligne de commande
 *         ID_ORDER_HEADER:
 *           type: int
 *           description: ID de l'en-tête de commande
 *         ORDER_QUANTITY:
 *           type: int
 *           description: Quantité du produit
 *         PRICE:
 *           type : number
 *           description : Prix du produit
 *       example:
 *         ID_ORDER_LINE : 1
 *         ID_PRODUCT : 1
 *         ID_ORDER_HEADER : 1
 *         ORDER_QUANTITY : 4
 *         PRICE : 5.90
 */