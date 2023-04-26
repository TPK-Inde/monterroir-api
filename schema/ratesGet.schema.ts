//Documentation du schéma des Rates
/**
 * @swagger
 * components:
 *   schemas:
 *     RatesGet:
 *       type: object
 *       properties:
 *         ID_USER:
 *           type: int
 *           description: ID de l'utilisateur ayant rédigé la note 
 *         ID_VITRINE:
 *           type: int
 *           description: Id de la vitrine associée à la note
 *         RATE:
 *           type: int
 *           description: le Rate
 *         DATE:
 *           type: date
 *           description: Date de l'enregistrement de la Rate
 *         OWNER:
 *           type: object
 *           properties:
 *             ID_USER:
 *               type: int
 *               description: ID de l'utilisateur ayant rédigé la note
 *             PSEUDONYM:
 *               type: string
 *               description: Pseudonyme de l'utilisateur ayant rédigé la note
 *       example:
 *         ID_USER: 4
 *         ID_VITRINE : 1
 *         RATE : 5
 *         DATE : 2023-04-14
 *         OWNER: {
 *           ID_USER: 1,
 *           PSEUDONYM: Marc_Dupont
 *         }
 */