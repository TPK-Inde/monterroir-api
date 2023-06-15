import express from "express";
import Messages from "../services/message"
import JwtAuthentification from "../middleware/jwtAuthentification";

const router = express.Router();

const jwtAuthentification = new JwtAuthentification();
const messageService = new Messages();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messages
 * /message/:
 *   get:
 *     summary: Permet de récupérer tous les messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: La récupération des messages a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SMessage'
 *       204:
 *         description: Aucun message
 *       500:
 *         description: Une erreur s'est produite lors de la récupération des messages
 *
 */
router.get("/", jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification), messageService.GetAll.bind(messageService))

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messages
 * /message:
 *   post:
 *     summary: Permet d'ajouter un nouveau message
 *     tags: [Messages]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SMessage'
 *     responses:
 *       201:
 *         description: L'ajout d'un message a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SMessage'
 *             example:
 *               message: "Création du message réussit"
 *       400:
 *         description: Un élément est manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SMessage'
 *             example:
 *               message: "Un élément est manquant dans la requête"
 *       500:
 *         description: Une erreur s'est produite lors de la création du message
 *
 */
router.post("/", jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification), messageService.Post.bind(messageService))

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messages
 * /message/{conversationId}:
 *   get:
 *     summary: Permet de récupérer tous les messages a partir d'un id de conversation
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la conversation
 *     responses:
 *       200:
 *         description: La récupération des messages a réussit.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SMessage'
 *       204:
 *         description: Aucun message
 *       500:
 *         description: Une erreur s'est produite lors de la récupération des messages
 *
 */
router.get("/:conversationId", jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification), messageService.GetByConversation.bind(messageService))

module.exports = router;