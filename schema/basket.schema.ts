//Documentation du schéma des Baskets
/**
 * @swagger
 * components:
 *   schemas:
 *     Basket:
 *       type: object
 *       required:
 *         - ID_USER
 *         - ID_PRODUCT
 *         - DATE
 *       properties:
 *         ID_USER:
 *           type: string
 *           description: ID de l'utilisateur affilié au panier 
 *         ID_PRODUCT:
 *           type: string
 *           description: Id des produits affiliés au panier
 *         DATE:
 *           type: date
 *           description: Date de l'enregistrement du panier
 *       example:
 *         ID_USER: 4
 *         ID_PRODUCT : 1
 *         DATE : 2023-04-18
 */