//Documentation du schéma des produits
/**
 * @swagger
 * components:
 *   schemas:
 *     Produit:
 *       type: object
 *       required:
 *         - ID_VITRINE
 *         - NAME
 *         - IMAGE
 *         - QUANTITY_STOCK
 *         - UNIT_PRICE_HT
 *         - DESCRIPTION
 *       properties:
 *         ID_PRODUCT:
 *           type: int
 *           description: ID du produit autogénéré
 *         ID_VITRINE:
 *           type: int
 *           description: ID de la vitrine liée au produit
 *         NAME:
 *           type: string
 *           description: Nom du produit 
 *         IMAGE:
 *           type: string
 *           description: IMAGE du produit
 *         QUANTITY_STOCK:
 *           type: string
 *           description: Quantité du stock
 *         UNIT_PRICE_HT:
 *           type: date
 *           description: Prix unitaire HT du produit
 *         DESCRIPTION:
 *           type: string
 *           description: Descrition du produit
 *       example:
 *         ID_PRODUCT : 1
 *         ID_VITRINE : 1
 *         NAME: "Carotte"
 *         IMAGE : "/img/2023/04/09/1.png"
 *         QUANTITY_STOCK : 12
 *         UNIT_PRICE_HT : 0.80
 *         DESCRIPTION : "Superbe carotte venant de mon jardin !"
 */