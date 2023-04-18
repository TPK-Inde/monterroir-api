import express from 'express';

const router = express.Router();
const products = require('../services/products.ts');

//Constante de middleware
const jwtAuthentification = require("../middleware/jwtAuthentification.ts");

/**
 * @swagger
 * tags:
 *   name: Produits
 *   description: CRUD Produits
 * /products/{id}:
 *   get:
 *     summary: Permet un produit via son ID
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: La récupération du produit a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produit'
 *       204:
 *         description: Aucun produit trouvé avec l'ID indiqué
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
router.get('/:id', products.findOne);

/**
 * @swagger
 * tags:
 *   name: Produits
 *   description: CRUD Produits
 * /products:
 *   post:
 *     summary: Permet d'ajouter un nouveau produit
 *     tags: [Produits]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Produit'
 *     responses:
 *       201:
 *         description: L'ajout du produit a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Création du produit réussit"  
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un nom de produit"
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.post('/', jwtAuthentification, products.addOne);

/**
 * @swagger
 * tags:
 *   name: Produits
 *   description: CRUD produit
 * /products/{id}:
 *   put:
 *     summary: Permet de modifier un produit en fonction de son ID
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du produit
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Produit'
 *     responses:
 *       200:
 *         description: La modification du produit a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Produit mis à jour"
 *       204:
 *         description: Aucun produit trouvé avec l'ID indiqué
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un nom de produit" 
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
router.put('/:id', jwtAuthentification, products.update); //Route nécessitant un token

/**
 * @swagger
 * tags:
 *   name: Produits
 *   description: CRUD Produit
 * /products/{id}:
 *   delete:
 *     summary: Permet de supprimer un produit en fonction de son ID
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du produit
 *     responses:
 *       200:
 *         description: La suppression du produit a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La suppression du produit a réussit" 
 *       400:
 *         description: Quelque chose a empêché la suppression du produit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Le produit id 1 n'a pas pu être supprimé, peut-être que cette id n'exite pas ?"  
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
router.delete('/:id', jwtAuthentification, products.delete); //Route nécessitant un token

module.exports = router;