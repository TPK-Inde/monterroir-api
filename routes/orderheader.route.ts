import express from "express";

const router = express.Router();
const orderHeaderService = require("../services/orderHeader");
const jwtAuthentification = require("../middleware/jwtAuthentification");

/**
 * @swagger
 * tags:
 *   name: En-têtes de commandes
 *   description: CRUD En-têtes de commandes
 * /orderheader:
 *   get:
 *     summary: Permet de récupérer la liste des en-têtes de commandes, (25 retours par page)
 *     tags: [En-têtes de commandes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         required: false
 *         description: Le numéro de page (1 par défaut)
 *     responses:
 *       200:
 *         description: La récupération de la liste est réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderHeader'
 *       500:
 *         description: Une erreur s'est produite lors de la récupération de tout les en-têtes de commandes.
 *
 */
router.get('/',jwtAuthentification, orderHeaderService.GetAllOrderHeader);
/**
 * @swagger
 * tags:
 *   name: En-têtes de commandes
 *   description: CRUD En-têtes de commandes
 * /orderheader/{id}:
 *   get:
 *     summary: Permet de récupérer un en-tête de commande en fonction de son ID
 *     tags: [En-têtes de commandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'en-tête de commande
 *     responses:
 *       200:
 *         description: La récupération de l'en-tête de commande a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderHeader'
 *       204:
 *         description: Aucun en-tête de commande trouvé avec l'ID indiqué
 *       500:
 *         description: Une erreur s'est produite lors de la récupération d'un en-tête de commande
 *
 */
router.get('/:id', jwtAuthentification, orderHeaderService.GetOrderHeaderById )
/**
 * @swagger
 * tags:
 *   name: En-têtes de commandes
 *   description: CRUD En-têtes de commandes
 * /orderheader/utilisateur/{id}:
 *   get:
 *     summary: Permet de récupérer la liste des en-têtes de commandes d'un utilisateur
 *     tags: [En-têtes de commandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: La récupération des en-tête de commandes a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderHeader'
 *       204:
 *         description: Aucun en-tête de commande trouvé avec l'ID utilisateur indiqué
 *       500:
 *         description: Une erreur s'est produite lors de la récupération des en-têtes de commandes d'un utilisateur
 *
 */
router.get('/utilisateur/:id',jwtAuthentification,  orderHeaderService.GetOrderHeaderByUser )
/**
 * @swagger
 * tags:
 *   name: En-têtes de commandes
 *   description: CRUD En-têtes de commandes
 * /orderheader/status/{userId}/{statusId}:
 *   get:
 *     summary: Permet de récupérer la liste des en-têtes de commandes d'un utilisateur selon le status de la commande
 *     tags: [En-têtes de commandes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *       - in: path
 *         name: statusId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du statut
 *     responses:
 *       200:
 *         description: La récupération des en-têtes de commandes a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderHeader'
 *       204:
 *         description: Aucun en-tête de commande trouvé avec l'ID utilisateur indiqué
 *       500:
 *         description: Une erreur s'est produite lors de la récupération des en-têtes de commandes d'un utilisateur
 *
 */
router.get('/status/:userId/:statusId', jwtAuthentification, orderHeaderService.GetOrderHeaderFromUserAndStatus)
/**
 * @swagger
 * tags:
 *   name: En-têtes de commandes
 *   description: CRUD En-têtes de commandes
 * /orderheader:
 *   post:
 *     summary: Permet d'ajouter un nouvel en-têtes de commandes
 *     tags: [En-têtes de commandes]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/OrderHeader'
 *     responses:
 *       201:
 *         description: L'ajout de l'en-tête de commande a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Création de l'en-tête de commande réussit"
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un ID d'utilisateur"
 *       500:
 *         description: Une erreur s'est produite lors de la création de l'en-tête de commande
 *
 */
router.post('/', jwtAuthentification, orderHeaderService.CreateOrderHeader )
/**
 * @swagger
 * tags:
 *   name: En-têtes de commandes
 *   description: CRUD En-têtes de commandes
 * /orderheader/{id}:
 *   put:
 *     summary: Permet de modifier un en-tête de commande en fonction de son ID
 *     description: Veuillez notez que le changement de propriétaire est impossible
 *     tags: [En-têtes de commandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'en-tête de commande'
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/OrderHeader'
 *     responses:
 *       200:
 *         description: La modification de l'en-tête de commande a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "En-tête de commande mise à jour"
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un Id d'en-tête de commande"
 *       401:
 *         description: Token vide ou invalide
 *       403:
 *         description: Token expiré ou pas les droits nécessaires
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               -  message: "Le token a expiré"
 *               -  message: "Vous ne disposez pas des droits pour effectuer cette action"
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.put('/:id', jwtAuthentification, orderHeaderService.UpdateOrderHeader )
/**
 * @swagger
 * tags:
 *   name: En-têtes de commandes
 *   description: CRUD En-têtes de commandes
 * /orderheader/{id}:
 *   delete:
 *     summary: Permet de supprimer un en-tête de commande en fonction de son ID
 *     tags: [En-têtes de commandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'en-tête de commande
 *     responses:
 *       200:
 *         description: La suppression de l'en-tête de commande a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La suppression de len-tête de commande a réussit"
 *       400:
 *         description: Quelque chose a empêché la suppression de l'en-tête de commande
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "L'en-tête de commande id 1 n'a pas pu être supprimée, peut-être que cette id n'exite pas ?"
 *       401:
 *         description: Token vide ou invalide
 *       403:
 *         description: Token expiré ou pas les droits nécessaires
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               -  message: "Le token a expiré"
 *               -  message: "Vous ne disposez pas des droits pour effectuer cette action"
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.delete('/:id', jwtAuthentification, orderHeaderService.DeleteOrderHeader )

module.exports = router;