import express from 'express';
import JwtAuthentification from "../middleware/jwtAuthentification";
import { FavoriteVitrineRepository } from '../Lib/Repositories/FavoriteVitrineRepository';
import FavoriteVitrine from '../services/favoriteVitrine';

const router = express.Router();

//Constante de middleware
const jwtAuthentification = new JwtAuthentification();

//Constante de service
const favoriteVitrineService = new FavoriteVitrine();

/**
 * @swagger
 * tags:
 *   name: Vitrine favorite
 *   description: CRUD Vitrine favorite
 * /favoriteVitrine/{ID_USER}:
 *   get:
 *     summary: Permet de retourner les vitrines favorites d'un utilisateur
 *     tags: [Vitrine favorite]
 *     parameters:
 *       - in: path
 *         name: ID_USER
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur'
 *     responses:
 *       200:
 *         description: La récupération du booléan vitrine en favorie réussit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteVitrineGet'
 *       204:
 *         description: Aucune catégorie de vitrine trouvé avec l'ID indiqué
 *       500:
 *         description: Une erreur s'est produite lors de la récupération d'une catégorie de vitrine
 *
 */
router.get('/:ID_USER', 
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  favoriteVitrineService.GetFavoriteVitrineByUserID.bind(favoriteVitrineService)
);

/**
 * @swagger
 * tags:
 *   name: Vitrine favorite
 *   description: CRUD Vitrine favorite
 * /favoriteVitrine/{ID_VITRINE}/{ID_USER}:
 *   get:
 *     summary: Permet de retourner un booléan en fonction de si l'utilisateur à cette vitrine en favori
 *     tags: [Vitrine favorite]
 *     parameters:
 *       - in: path
 *         name: ID_VITRINE
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de vitrine
 *       - in: path
 *         name: ID_USER
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur'
 *     responses:
 *       200:
 *         description: La récupération du booléan vitrine en favorie réussit
 *         content:
 *           application/json:
 *             example:
 *               isFavorite: true 
 *       204:
 *         description: Aucune catégorie de vitrine trouvé avec l'ID indiqué
 *       500:
 *         description: Une erreur s'est produite lors de la récupération d'une catégorie de vitrine
 *
 */
router.get('/:ID_VITRINE/:ID_USER', 
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  favoriteVitrineService.GetByIdVitrineAndUser.bind(favoriteVitrineService)
);

/**
 * @swagger
 * tags:
 *   name: Vitrine favorite
 *   description: CRUD Vitrine favorite
 * /favoriteVitrine:
 *   post:
 *     summary: Permet d'ajouter une nouvelle catégorie de vitrine
 *     tags: [Vitrine favorite]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/FavoriteVitrine'
 *     responses:
 *       201:
 *         description: L'ajout de la vitrine au favori a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "L'ajout de la vitrine au favori a réussit"  
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Cette vitrine est déjà en favori !"
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
 *         description: Une erreur s'est produite lors de la vitrine au favori
 *
 */
router.post(
  '/',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  favoriteVitrineService.PostFavoriteVitrine.bind(favoriteVitrineService)
);//Route nécessitant un token

/**
 * @swagger
 * tags:
 *   name: Vitrine favorite
 *   description: CRUD Vitrine favorite
 * /favoriteVitrine/{ID_VITRINE}/{ID_USER}:
 *   delete:
 *     summary: Permet de supprimer une vitrine des favoris
 *     tags: [Vitrine favorite]
 *     parameters:
 *       - in: path
 *         name: ID_VITRINE
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de vitrine
 *       - in: path
 *         name: ID_USER
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur'
 *     responses:
 *       200:
 *         description: La suppression de vitrine des favoris à fonctionnée.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La suppression du favori à réussit" 
 *       400:
 *         description: Quelque chose a empêché la suppression de la vitrine des favoris
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La suppression du favori à échouée"  
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
  '/:ID_VITRINE/:ID_USER',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  favoriteVitrineService.DeleteFavoriteVitrine.bind(favoriteVitrineService)
); //Route nécessitant un token

module.exports = router;