//Documentation du schéma des Rates
/**
 * @swagger
 * components:
 *   schemas:
 *     RatesAuthentification:
 *       type: object
 *       required:
 *         - ID_USER
 *         - ID_VITRINE
 *         - RATE
 *         - DATE
 *       properties:
 *         ID_USER:
 *           type: string
 *           description: ID de l'utilisateur ayant rédigé le Rate 
 *         ID_VITRINE:
 *           type: string
 *           description: Id de la vitrine associée à la Rate
 *         RATE:
 *           type: string
 *           description: le Rate
 *         DATE:
 *           type: date
 *           description: Date de l'enregistrement de la Rate
 *       example:
 *         ID_USER: 4
 *         ID_VITRINE : 1
 *         RATE : "5"
 *         DATE : 2023-04-14
 */