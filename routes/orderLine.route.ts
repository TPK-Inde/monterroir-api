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
 * /orderline/{id}:
 *   get:
 *     summary: Permet de récupérer une ligne de commande en fonction de son ID
 *     tags: [Lignes de commande]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ligne de commande
 *     responses:
 *       200:
 *         description: La récupération de la ligne de commande a réussit.
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
  '/:id',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  orderLineService.GetOrderLineById
);


/**
 * @swagger
 * tags:
 *   name: Lignes de commande
 *   description: CRUD Lignes de commande
 * /orderline/header/{id}:
 *   get:
 *     summary: Permet de récupérer une ligne de commande en fonction de l'ID de l'en-tête de commande
 *     tags: [Lignes de commande]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la l'en-tête de commande
 *     responses:
 *       200:
 *         description: La récupération de la ligne de commande a réussit.
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
  '/header/:id',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  orderLineService.GetOrderLinesByOrderHeaderId
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
 *         description: L'ajout de la ligne de commande a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Création de la ligne de commande réussit"
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
 * /orderline/{id}:
 *   put:
 *     summary: Permet de mettre à jour une nouvelle ligne de commande
 *     tags: [Lignes de commande]
 *     parameters:
 *       - in: path
 *         name: id
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
 *         description: La mise a jour de la ligne de commande a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Mise a jour de la ligne de commande réussit"
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
  '/:id',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  orderLineService.PutOrderLine.bind(orderLineService)
);


/**
 * @swagger
 * tags:
 *   name: Lignes de commande
 *   description: CRUD Lignes de commande de commandes
 * /orderline/{id}:
 *   delete:
 *     summary: Permet de supprimer une ligne de commande en fonction de son ID
 *     tags: [Lignes de commande]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la ligne de commande
 *     responses:
 *       200:
 *         description: La suppression de la ligne de commande a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La suppression de la ligne de commande a réussit"
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
  '/:id',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  orderLineService.DeleteOrderLine
);

module.exports = router;
