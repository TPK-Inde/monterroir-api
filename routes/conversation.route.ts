import express from 'express';
import Conversations from '../services/conversation';
import JwtAuthentification from "../middleware/jwtAuthentification";

const router = express.Router();

const jwtAuthentification = new JwtAuthentification();
const conversationService = new Conversations();

/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: Conversations
 * /conversation:
 *   get:
 *     summary: Permet de récupérer toutes les conversations
 *     tags: [Conversations]
 *     responses:
 *       200:
 *         description: La récupération des conversations a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 *       204:
 *         description: Aucune conversation
 *       500:
 *         description: Une erreur s'est produite lors de la récupération des conversations
 *
 */
router.get('/', conversationService.GetAll)

/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: Conversations
 * /conversation:
 *   post:
 *     summary: Permet d'ajouter une nouvelle conversation
 *     tags: [Conversations]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Conversation'
 *     responses:
 *       201:
 *         description: L'ajout d'une conversation a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 *             example:
 *               message: "Création de la conversation réussit"
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 *             example:
 *               message: "Un élément est manquant dans la requête"
 *       500:
 *         description: Une erreur s'est produite lors de la création de la conversation
 *
 */
router.post('/', conversationService.Post)

/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: Conversations
 * /conversation/{userId}:
 *   get:
 *     summary: Permet de récupérer toutes les conversations a partir d'un id d'utilisateur
 *     tags: [Conversations]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: ID de la conversation
 *     responses:
 *       200:
 *         description: La récupération des conversations a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 *       204:
 *         description: Aucun message
 *       500:
 *         description: Une erreur s'est produite lors de la récupération des conversations
 *
 */
router.get('/:id', conversationService.GetByUser)


module.exports = router;