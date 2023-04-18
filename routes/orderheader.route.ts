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
 *     tags: [OrderHeader]
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
router.get('/', jwtAuthentification, orderHeaderService.findAll);
/**
 * @swagger
 * tags:
 *   name: En-têtes de commandes
 *   description: CRUD En-têtes de commandes
 * /orderheader/{id}:
 *   get:
 *     summary: Permet de récupérer un en-tête de commande en fonction de son ID
 *     tags: [OrderHeader]
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
router.get('/:id', jwtAuthentification, orderHeaderService.findOne )
/**
 * @swagger
 * tags:
 *   name: En-têtes de commandes
 *   description: CRUD En-têtes de commandes
 * /vitrines/utilisateur/{id}:
 *   get:
 *     summary: Permet de récupérer la liste des en-têtes de commandes d'un utilisateur
 *     tags: [OrderHeader]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: La récupération des vitrines a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderHeader'
 *       204:
 *         description: Aucune vitrine trouvé avec l'ID utilisateur indiqué
 *       500:
 *         description: Une erreur s'est produite lors de la récupération des vitrines d'un utilisateur
 *
 */
router.get('/utilisateur/:id', jwtAuthentification, orderHeaderService.findFromUser )
/**
 * @swagger
 * tags:
 *   name: En-têtes de commandes
 *   description: CRUD En-têtes de commandes
 * /vitrines/utilisateur/{id}:
 *   get:
 *     summary: Permet de récupérer la liste des en-têtes de commandes d'un utilisateur
 *     tags: [OrderHeader]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/OrderHeader'
 *     responses:
 *       200:
 *         description: La récupération des vitrines a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderHeader'
 *       204:
 *         description: Aucune vitrine trouvé avec l'ID utilisateur indiqué
 *       500:
 *         description: Une erreur s'est produite lors de la récupération des vitrines d'un utilisateur
 *
 */
router.get('/status/:id', jwtAuthentification , orderHeaderService.findFromUserAndStatus)
/**
 * @swagger
 * tags:
 *   name: En-têtes de commandes
 *   description: CRUD En-têtes de commandes
 * /vitrines:
 *   post:
 *     summary: Permet d'ajouter un nouvel en-têtes de commandes
 *     tags: [OrderHeader]
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
 *               message: "Création de la vitrine réussit"
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un nom de vitrine"
 *       500:
 *         description: Une erreur s'est produite lors de la création de la vitrine
 *
 */
router.post('/', jwtAuthentification, orderHeaderService.addOne )
router.put('/:id', jwtAuthentification, orderHeaderService.update )
router.delete('/:id', jwtAuthentification, orderHeaderService.delete )

