import express from 'express';
import Users from '../services/user';

import JwtAuthentification from "../middleware/jwtAuthentification";

const router = express.Router();
const userService = new Users();

//Constante de middleware
const jwtAuthentification = new JwtAuthentification();

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: CRUD utilisateur
 * /users:
 *   get:
 *     summary: Permet de récupérer la liste des utilisateurs, (25 retours par page)
 *     tags: [Utilisateurs]
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
 *               $ref: '#/components/schemas/UserGet'
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
 *               
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.get(
  '/',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckUserIsSuperAdministrator.bind(jwtAuthentification),
  userService.GetAll.bind(userService)
); //Route nécessitant un token

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: CRUD utilisateur
 * /users/{ID_USER}:
 *   get:
 *     summary: Permet de récupérer un utilisateur en fonction de son ID
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: ID_USER
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: La récupération d'utilisateur a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserGet'
 *       204:
 *         description: Aucun utilisateur trouvé avec l'ID indiqué
 *       400:
 *         description: Un élément de la requête n'est pas valide
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
router.get(
  '/:ID_USER',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  userService.GetById.bind(userService)
); //Route nécessitant un token

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: CRUD utilisateur
 * /users/limited/{ID_USER}:
 *   get:
 *     summary: Permet de récupérer les informations limité d'un utilisateur en fonction de son ID
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: ID_USER
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: La récupération d'utilisateur a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserGetLimited'
 *       204:
 *         description: Aucun utilisateur trouvé avec l'ID indiqué
 *       400:
 *         description: Un élément de la requête n'est pas valide
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
router.get(
  '/limited/:ID_USER',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  userService.GetLimitedInformationById.bind(userService)
); //Route nécessitant un token

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: CRUD utilisateur
 * /users/authentification:
 *   post:
 *     summary: Permet de vérifier l'authentification d'un utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserAuth'
 *     responses:
 *       200:
 *         description: Résultat de l'authentification.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *             example:
 *               -  resultat: true
 *                  message: "Authentification réussit"
 *               -  resultat: false
 *                  message: "Authentification non valide"
 *       400:
 *         description: L'utilisateur n'a pas été trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *             example:
 *               -  resultat: false
 *                  message: "Aucun utilisateur trouvé avec cette adresse email"
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.post(
  '/authentification',
  userService.AuthUser.bind(userService)
);

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: CRUD utilisateur
 * /users:
 *   post:
 *     summary: Permet d'ajouter un nouvelle utilisateur
 *     tags: [Utilisateurs]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: L'ajout de l'utilisateur a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Création de l'utilisateur réussit"  
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un nom de famille"
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.post(
  '/',
  userService.PostNewUser.bind(userService)
);

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: CRUD utilisateur
 * /users/{ID_USER}:
 *   put:
 *     summary: Permet de modifier un utilisateur en fonction de son ID, si le mot de passe n'est pas renseigné le mot de passe ne change pas
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: ID_USER
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: La modification de l'utilisateur a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Utilisateur mis à jour"
 *       204:
 *         description: Aucun utilisateur trouvé avec l'ID indiqué
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Veuillez entrer un nom de famille" 
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
  '/:ID_USER',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  userService.PutUser.bind(userService)
); //Route nécessitant un token

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: CRUD utilisateur
 * /users/{ID_USER}:
 *   delete:
 *     summary: Permet de supprimer un utilisateur en fonction de son ID
 *     tags: [Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: ID_USER
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: La suppression de l'utilisateur a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La suppression de l'utilisateur a réussit" 
 *       400:
 *         description: Quelque chose a empêché la suppression de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "L'utilisateur id 1 n'a pas pu être supprimé, peut-être que cette id n'exite pas ?"  
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
  '/:ID_USER',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  userService.DeleteUser.bind(userService)
); //Route nécessitant un token

module.exports = router;