import express from "express";
import OrderLines from "../services/orderLine";
import JwtAuthentification from "../middleware/jwtAuthentification";

const router = express.Router();
const orderLineService = new OrderLines();
const jwtAuthentification = new JwtAuthentification();


/**
 * @swagger
 * tags:
 *   name: Lignes de commande
 *   description: CRUD Lignes de commande
 * /orderline/{ID_ORDER_LINE}:
 *   get:
 *     summary: Permet de récupérer une ligne de commande en fonction de son ID
 *     tags: [Lignes de commande]
 *     parameters:
 *       - in: path
 *         name: ID_ORDER_LINE
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ligne de commande
 *     responses:
 *       200:
 *         description: La récupération de la ligne de commande a réussi.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderLine'
 *       204:
 *         description: Aucune ligne de commande trouvé avec l'ID indiqué
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un ID de ligne de commande"
 *       500:
 *         description: Une erreur s'est produite lors de la récupération d'une ligne de commande
 *
 */
router.get(
  '/:ID_ORDER_LINE',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  orderLineService.GetOrderLineById.bind(orderLineService)
);


/**
 * @swagger
 * tags:
 *   name: Lignes de commande
 *   description: CRUD Lignes de commande
 * /orderline/header/{ID_ORDER_HEADER}:
 *   get:
 *     summary: Permet de récupérer une ligne de commande en fonction de l'ID de l'en-tête de commande
 *     tags: [Lignes de commande]
 *     parameters:
 *       - in: path
 *         name: ID_ORDER_HEADER
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la l'en-tête de commande
 *     responses:
 *       200:
 *         description: La récupération de la ligne de commande a réussi.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderLine'
 *       204:
 *         description: Aucune ligne de commande trouvé avec l'ID indiqué
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un ID de l'en-tête de commande"
 *       500:
 *         description: Une erreur s'est produite lors de la récupération des lignes de commande
 *
 */
router.get(
  '/header/:ID_ORDER_HEADER',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  orderLineService.GetOrderLinesByOrderHeaderId.bind(orderLineService)
);

/**
 * @swagger
 * tags:
 *   name: Lignes de commande
 *   description: CRUD Lignes de commande
 * /orderline/totalHeader/{ID_ORDER_HEADER}:
 *   get:
 *     summary: Récupère le total de la commande par la somme des produits la composant
 *     tags: [Lignes de commande]
 *     parameters:
 *       - in: path
 *         name: ID_ORDER_HEADER
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la l'en-tête de commande
 *     responses:
 *       200:
 *         description: La récupération du total de la commande a réussi.
 *         content:
 *           text/plain:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                      type: number
 *                      description: le total de la commande
 *       204:
 *         description: Aucune ligne de commande trouvé avec l'ID indiqué
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un ID de l'en-tête de commande"
 *       500:
 *         description: Une erreur s'est produite lors de la récupération des lignes de commande
 *
 */
router.get(
  '/totalHeader/:ID_ORDER_HEADER',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  orderLineService.GetOrderTotalByOrderHeaderId.bind(orderLineService)
);

/**
 * @swagger
 * tags:
 *   name: Lignes de commande
 *   description: CRUD Lignes de commande
 * /orderline:
 *   post:
 *     summary: Permet d'ajouter une nouvelle ligne de commande
 *     tags: [Lignes de commande]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/OrderLine'
 *     responses:
 *       201:
 *         description: L'ajout de la ligne de commande a réussi.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Création de la ligne de commande réussi"
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Un élément est manquant dans la requête"
 *       500:
 *         description: Une erreur s'est produite lors de la création de la ligne de commande
 *
 */
router.post(
  '/',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  orderLineService.PostNewOrderLine.bind(orderLineService)
);


/**
 * @swagger
 * tags:
 *   name: Lignes de commande
 *   description: CRUD Lignes de commande
 * /orderline/{ID_ORDER_LINE}:
 *   put:
 *     summary: Permet de mettre à jour une nouvelle ligne de commande
 *     tags: [Lignes de commande]
 *     parameters:
 *       - in: path
 *         name: ID_ORDER_LINE
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ligne de commande'
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/OrderLine'
 *     responses:
 *       200:
 *         description: La mise a jour de la ligne de commande a réussi.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Mise a jour de la ligne de commande réussi"
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Un élément est manquant dans la requête"
 *       500:
 *         description: Une erreur s'est produite lors de la mise a jour de la ligne de commande
 *
 */
router.put(
  '/:ID_ORDER_LINE',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  orderLineService.PutOrderLine.bind(orderLineService)
);


/**
 * @swagger
 * tags:
 *   name: Lignes de commande
 *   description: CRUD Lignes de commande de commandes
 * /orderline/{ID_ORDER_LINE}:
 *   delete:
 *     summary: Permet de supprimer une ligne de commande en fonction de son ID
 *     tags: [Lignes de commande]
 *     parameters:
 *       - in: path
 *         name: ID_ORDER_LINE
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ligne de commande
 *     responses:
 *       200:
 *         description: La suppression de la ligne de commande a réussi.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La suppression de la ligne de commande a réussi"
 *       400:
 *         description: Quelque chose a empêché la suppression de la ligne de commande
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La ligne de commande id 1 n'a pas pu être supprimée, peut-être que cette id n'exite pas ?"
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.delete(
  '/:ID_ORDER_LINE',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  orderLineService.DeleteOrderLine.bind(orderLineService)
);

module.exports = router;
