//Documentation du schéma Conversation
/**
 * @swagger
 * components:
 *   schemas:
 *     Conversation:
 *       type: object
 *       required:
 *         - members
 *       properties:
 *         members:
 *           type: array
 *           description: liste des membres de la conversation
 *           items:
 *             type: string
 *       example:
 *         members: [6,3]
 */