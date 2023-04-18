import express from "express";
import Baskets from "../services/baskets";

const router = express.Router();
const basketService = new Baskets();
const jwAuthentification = require("../middleware/jwtAuthentification");


/**
 * @swagger
 * tags:
 *  name: Baskets
 *  description: CRUD Baskets
 * /rates:
 *   get:
 *     summary: Permet de récupérer tous les paniers
 *     tags: [Baskets]
 *     responses:
 *       200:
 *         description: La récupération des paniers a réussie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Basket'
 *       204:
 *         description: Aucun panier n'est présent dans la base de données
 *       500:
 *         description: Erreur du serveur interne
 * 
 */
router.get('/', basketService.GetAll.bind(basketService));


/**
 * @swagger
 * tags:
 *  name: Baskets
 *  description: CRUD Baskets
 * /baskets/{ID}:
 *   get:
 *     summary: Permet de récupérer le panier en fonction de son ID
 *     tags: [Baskets]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du panier
 *     responses:
 *       200:
 *         description: La récupération du panier a réussie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Basket'
 *       204:
 *         description: Aucun panier trouvé avec l'ID indiqué
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
router.get('/:ID', basketService.GetById.bind(basketService));

/**
 * @swagger
 * tags:
 *   name: Baskets
 *   description: CRUD Rate
 * /rates:
 *   post:
 *     summary: Permet de poster un nouveau panier
 *     tags: [Baskets]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *     responses:
 *       204:
 *         description: Envoi réussit d'un nouveau panier.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *       400:
 *         description: Echec lors de l'enregistrement du panier.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *             example:
 *               -  resultat: false
 *                  message: "Echec lors de l'enregistrement du panier"
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.post('/', basketService.PostNewBasket.bind(basketService))

/**
 * @swagger
 * tags:
 *   name: Baskets
 *   description: CRUD panier
 * /baskets/{ID}:
 *   put:
 *     summary: Permet de modifier un panier
 *     tags: [Baskets]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du panier à changer
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *     responses:
 *       204:
 *         description: Mise à jour réussie du panier.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *       400:
 *         description: Echec lors de la modification du panier.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *             example:
 *               -  resultat: false
 *                  message: "Echec lors de la modification du panier"
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.put('/:ID', basketService.PutBasket.bind(basketService))

/**
 * @swagger
 * tags:
 *   name: Baskets
 *   description: CRUD Baskets
 * /baskets/{ID}:
 *   delete:
 *     summary: Permet de supprimer un panier en fonction de son ID
 *     tags: [Baskets]
 *     parameters:
 *       - in: path
 *         name: ID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du panier
 *     responses:
 *       200:
 *         description: La suppression du panier a réussie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La suppression du panier a réussie." 
 *       400:
 *         description: Quelque chose a empêché la suppression du panier
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Le panier d'id 1 n'a pas pu être supprimé, peut-être que cette id n'exite pas ?"             
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.delete('/:ID', basketService.DeleteBasket.bind(basketService));

module.exports = router;