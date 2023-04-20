import express from "express";
import OrderLines from "../services/orderLine";
const router = express.Router();
const orderLineService = new OrderLines();
const jwtAuthentification = require("../middleware/jwtAuthentification");


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
 *         description: La récupération de la ligne de commande a réussi.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Orderligne'
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
router.get('/:id',jwtAuthentification, orderLineService.GetOrderLineById);


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
 *         description: La récupération de la ligne de commande a réussi.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Orderligne'
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
router.get('/header/:id',jwtAuthentification, orderLineService.GetOrderLinesByOrderHeaderId);

/**
 * @swagger
 * tags:
 *   name: Lignes de commande
 *   description: CRUD Lignes de commande
 * /orderline/totalHeader/{id}:
 *   get:
 *     summary: Récupère le total de la commande par la somme des produits la composant
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
 *         description: La récupération du total de la commande a réussi.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Orderligne'
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
router.get('/totalHeader/:id', orderLineService.GetOrderTotalByOrderHeaderId.bind(orderLineService));

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
router.post('/',jwtAuthentification, orderLineService.PostNewOrderLine.bind(orderLineService));


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
router.put('/:id',jwtAuthentification, orderLineService.PutOrderLine.bind(orderLineService));


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
router.delete('/:id',jwtAuthentification, orderLineService.DeleteOrderLine);

module.exports = router;
