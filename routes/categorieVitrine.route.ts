import express from 'express';

const router = express.Router();
const categoryVitrine = require('../services/categoriesVitrine.ts');

//Constante de middleware
const jwtAuthentification = require("../middleware/jwtAuthentification.ts");

/**
 * @swagger
 * tags:
 *   name: Catégories vitrine
 *   description: CRUD catégories vitrine
 * /categoriesVitrine:
 *   get:
 *     summary: Permet de récupérer la liste des catégories de vitrine
 *     tags: [Catégories vitrine]
 *     responses:
 *       200:
 *         description: La récupération de la liste est réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategorieVitrine'
 *       500:
 *         description: Une erreur s'est produite lors de la récupération de toutes les catégories de vitrine
 *
 */
router.get('/', categoryVitrine.findAll);

/**
 * @swagger
 * tags:
 *   name: Catégories vitrine
 *   description: CRUD catégories vitrine
 * /categoriesVitrine/{id}:
 *   get:
 *     summary: Permet de récupérer une catégorie de vitrine en fonction de son ID
 *     tags: [Catégories vitrine]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la catégorie de vitrine
 *     responses:
 *       200:
 *         description: La récupération de la catégorie de vitrine a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategorieVitrine'
 *       204:
 *         description: Aucune catégorie de vitrine trouvé avec l'ID indiqué
 *       500:
 *         description: Une erreur s'est produite lors de la récupération d'une catégorie de vitrine
 *
 */
router.get('/:id', categoryVitrine.findOne);

/**
 * @swagger
 * tags:
 *   name: Catégories vitrine 
 *   description: CRUD catégories vitrine
 * /categoriesVitrine:
 *   post:
 *     summary: Permet d'ajouter une nouvelle catégorie de vitrine
 *     tags: [Catégories vitrine]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CategorieVitrine'
 *     responses:
 *       201:
 *         description: L'ajout de la catégorie de vitrine a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Création de la catégorie de vitrine réussit"  
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un nom de catégorie de vitrine"
 *       500:
 *         description: Une erreur s'est produite lors de la création de la catégorie de vitrine
 *
 */
router.post('/', jwtAuthentification, categoryVitrine.addOne);//Route nécessitant un token

/**
 * @swagger
 * tags:
 *   name: Catégories vitrine
 *   description: CRUD catégories vitrine
 * /categoriesVitrine/{id}:
 *   put:
 *     summary: Permet de modifier une catégorie de vitrine en fonction de son ID
 *     tags: [Catégories vitrine]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la catégorie de vitrine
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CategorieVitrine'
 *     responses:
 *       200:
 *         description: La modification de la catégorie de vitrine a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Catégorie de vitrine mise à jour"
 *       204:
 *         description: Aucune catégorie de vitrine trouvé avec l'ID indiqué
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un nom de catégorie de vitrine" 
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
router.put('/:id', jwtAuthentification, categoryVitrine.update);//Route nécessitant un token

/**
 * @swagger
 * tags:
 *   name: Catégories vitrine
 *   description: CRUD catégories vitrine
 * /categoriesVitrine/{id}:
 *   delete:
 *     summary: Permet de supprimer une catégorie de vitrine en fonction de son ID
 *     tags: [Catégories vitrine]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la catégorie de vitrine
 *     responses:
 *       200:
 *         description: La suppression de la catégorie de vitrine a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La suppression de la catégorie de vitrine a réussit" 
 *       400:
 *         description: Quelque chose a empêché la suppression de la catégorie de vitrine
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La catégorie de vitrine id 1 n'a pas pu être supprimée, peut-être que cette id n'exite pas ?"  
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
router.delete('/:id', jwtAuthentification, categoryVitrine.delete); //Route nécessitant un token

module.exports = router;