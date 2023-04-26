import express from 'express';
import Vitrines from '../services/vitrines';
import JwtAuthentification from "../middleware/jwtAuthentification";

const router = express.Router();
const vitrinesService = new Vitrines();


//Constante de middleware
const jwtAuthentification = new JwtAuthentification();

/**
 * @swagger
 * tags:
 *   name: Vitrines
 *   description: CRUD vitrines
 * /vitrines:
 *   get:
 *     summary: Permet de récupérer la liste des vitrines, (25 retours par page)
 *     tags: [Vitrines]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Le numéro de page (1 par défaut)
 *     responses:
 *       200:
 *         description: La récupération de la liste est réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VitrineGet'
 *       204:
 *         description: Aucune vitrines trouvées en base de données
 *       500:
 *         description: Une erreur s'est produite lors de la récupération de toutes les vitrines
 *
 */
router.get(
  '/',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckUserIsAdministrator.bind(jwtAuthentification),
  vitrinesService.GetAll.bind(vitrinesService)
);

/**
 * @swagger
 * tags:
 *   name: Vitrines
 *   description: CRUD vitrines
 * /vitrines/active:
 *   get:
 *     summary: Permet de récupérer la liste des vitrines actives, (25 retours par page)
 *     tags: [Vitrines]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Le numéro de page (1 par défaut)
 *     responses:
 *       200:
 *         description: La récupération de la liste est réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VitrineGet'
 *       204:
 *         description: Aucune vitrines actives trouvée en base de données
 *       500:
 *         description: Une erreur s'est produite lors de la récupération de toutes les vitrines actives
 *
 */
router.get(
  '/active',
  vitrinesService.GetAllActive.bind(vitrinesService)
);

/**
 * @swagger
 * tags:
 *   name: Vitrines
 *   description: CRUD vitrines
 * /vitrines/{ID_VITRINE}:
 *   get:
 *     summary: Permet de récupérer une vitrine en fonction de son ID
 *     tags: [Vitrines]
 *     parameters:
 *       - in: path
 *         name: ID_VITRINE
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la vitrine
 *     responses:
 *       200:
 *         description: La récupération de la vitrine a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VitrineGet'
 *       204:
 *         description: Aucune vitrine trouvée avec l'ID indiqué
 *       500:
 *         description: Une erreur s'est produite lors de la récupération d'une vitrine
 *
 */
router.get(
  '/:ID_VITRINE',
  vitrinesService.GetById.bind(vitrinesService)
);

/**
 * @swagger
 * tags:
 *   name: Vitrines
 *   description: CRUD vitrines
 * /vitrines/user/{ID_USER}:
 *   get:
 *     summary: Permet de récupérer la liste des vitrines d'un utilisateur
 *     tags: [Vitrines]
 *     parameters:
 *       - in: path
 *         name: ID_USER
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: La récupération des vitrines a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VitrineGet'
 *       204:
 *         description: Aucune vitrine trouvé avec l'ID utilisateur indiqué
 *       500:
 *         description: Une erreur s'est produite lors de la récupération des vitrines d'un utilisateur
 *
 */
router.get(
  '/user/:ID_USER',
  vitrinesService.GetByUserId.bind(vitrinesService)
);

/**
 * @swagger
 * tags:
 *   name: Vitrines
 *   description: CRUD vitrines
 * /vitrines:
 *   post:
 *     summary: Permet d'ajouter une nouvelle vitrine
 *     description: Veuillez notez que le champ 'Actif' est automatiquement mis à false lors de la création (même si vous envoyez true) et que les coordonnées sont mis à jour par l'API via l'adresse. L'envoi de paramètre est inutile
 *     tags: [Vitrines]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Vitrine'
 *     responses:
 *       201:
 *         description: L'ajout de la vitrine a réussit.
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
router.post(
  '/',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  vitrinesService.PostNewVitrine.bind(vitrinesService)
);//Route nécessitant un token

/**
 * @swagger
 * tags:
 *   name: Vitrines
 *   description: CRUD vitrines
 * /vitrines/{ID_VITRINE}:
 *   put:
 *     summary: Permet de modifier une vitrine en fonction de son ID
 *     description: Veuillez notez que le changement de propriétaire est impossible et que les coordonnées sont mis à jour par l'API via l'adresse. L'envoi de paramètre est inutile
 *     tags: [Vitrines]
 *     parameters:
 *       - in: path
 *         name: ID_VITRINE
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la vitrine
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Vitrine'
 *     responses:
 *       200:
 *         description: La modification de la vitrine a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Vitrine mise à jour"
 *       204:
 *         description: Aucune vitrine trouvé avec l'ID indiqué
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un nom de vitrine" 
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
router.put(
  '/:ID_VITRINE',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  vitrinesService.PutVitrine.bind(vitrinesService)
);//Route nécessitant un token

/**
 * @swagger
 * tags:
 *   name: Vitrines
 *   description: CRUD vitrines
 * /vitrines/{ID_VITRINE}:
 *   delete:
 *     summary: Permet de supprimer une vitrine en fonction de son ID
 *     tags: [Vitrines]
 *     parameters:
 *       - in: path
 *         name: ID_VITRINE
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la vitrine
 *     responses:
 *       200:
 *         description: La suppression de la vitrine a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La suppression de la vitrine a réussit" 
 *       400:
 *         description: Quelque chose a empêché la suppression de la vitrine
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La vitrine id 1 n'a pas pu être supprimée, peut-être que cette id n'exite pas ?"  
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
router.delete(
  '/:ID_VITRINE',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  vitrinesService.DeleteVitrine.bind(vitrinesService)
); //Route nécessitant un token

module.exports = router;