//Documentation du schéma Conversation
/**
 * @swagger
 * components:
 *   schemas:
 *     SMessage:
 *       type: object
 *       required:
 *         - conversationId
 *         - sender
 *         - text
 *       properties:
 *         conversationId:
 *           type: string
 *           description: Id de la conversation
 *         sender:
 *           type: string
 *           description: Id de celui qui a envoyé le message
 *         text:
 *           type: string
 *           description: Contenu du message
 *       example:
 *         conversationId: "6455a854ee9fc9c75712e285"
 *         sender: "6"
 *         text: "Bonjour !"
 */