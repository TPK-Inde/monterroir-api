//Documentation du schéma Conversation
/**
 * @swagger
 * components:
 *   schemas:
 *     FavoriteVitrineGet:
 *       type: object
 *       required:
 *         - ID_VITRINE
 *         - ID_USER
 *       properties:
 *         ID_VITRINE:
 *           type: int
 *           description: ID de la vitrine
 *         ID_USER:
 *           type: int
 *           description: ID de l'utilisateur
 *         VITRINE:
 *           type: object
 *           properties:
 *             ID_VITRINE:
 *               type: int
 *               description: ID de la vitrine
 *             NAME:
 *               type: string
 *               description: Nom de la vitrine
 *             IMAGE:
 *               type: string
 *               description: Image de la vitrine
 *       example:
 *         ID_VITRINE: 1
 *         ID_USER: 1
 *         VITRINE:
 *           ID_VITRINE: 1
 *           NAME: "Ferme à Robert"
 *           Image: "Image Base64"
 */