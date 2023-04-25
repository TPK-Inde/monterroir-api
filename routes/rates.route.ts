import express from 'express';
import JwtAuthentification from "../middleware/jwtAuthentification";

const router = express.Router();
const service = require('../services/rates.ts');
const jwtAuthentification = new JwtAuthentification();


/**
 * @swagger
 * tags:
 *  name: Rates
 *  description: CRUD Rates
 * /rates:
 *   get:
 *     summary: Permet de récupérer tous les Rates
 *     tags: [Rates]
 *     responses:
 *       200:
 *         description: La récupération des Rates a réussie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatesGet'
 *       204:
 *         description: Aucun Rate n'est présent dans la base de données
 *       500:
 *         description: Erreur du serveur interne
 * 
 */
router.get(
  '/',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckUserIsModerator.bind(jwtAuthentification),
  service.GetAll
);

/**
 * @swagger
 * tags:
 *  name: Rates
 *  description: CRUD Rates
 * /rates/{ID_RATE}:
 *   get:
 *     summary: Permet de récupérer le Rate en fonction de son ID
 *     tags: [Rates]
 *     parameters:
 *       - in: path
 *         name: ID_RATE
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du Rate
 *     responses:
 *       200:
 *         description: La récupération du Rate a réussie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatesGet'
 *       204:
 *         description: Aucun Rate trouvé avec l'ID indiqué
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
  '/:ID_RATE',
  service.GetRateById
);

/**
 * @swagger
 * tags:
 *  name: Rates
 *  description: CRUD Rates
 * /rates/vitrine/{ID_VITRINE}:
 *   get:
 *     summary: Permet de récupérer le Rate en fonction de l'ID de la vitrine
 *     tags: [Rates]
 *     parameters:
 *       - in: path
 *         name: ID_VITRINE
 *         schema:
 *           type: integer
 *         required: true
 *         description: Rates affiliés à la vitrine en fonction de son ID
 *     responses:
 *       200:
 *         description: La récupération des Rates a réussie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatesGet'
 *       204:
 *         description: Aucun commentaire trouvé avec l'ID indiqué
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
  '/vitrine/:ID_VITRINE',
  service.GetVitrineRate
);

/**
 * @swagger
 * tags:
 *   name: Rates
 *   description: CRUD Rate
 * /rates:
 *   post:
 *     summary: Permet de poster un nouveau Rate
 *     tags: [Rates]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Rates'
 *     responses:
 *       204:
 *         description: Envoi réussit d'un nouveau Rate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *       400:
 *         description: Echec lors de l'enregistrement du Rate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *             example:
 *               -  resultat: false
 *                  message: "Echec lors de l'enregistrement du Rate"
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.post(
  '/',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  service.PostNewRate
)

/**
 * @swagger
 * tags:
 *   name: Rates
 *   description: CRUD Rate
 * /rates/{ID_RATE}:
 *   put:
 *     summary: Permet de modifier un Rate
 *     tags: [Rates]
 *     parameters:
 *       - in: path
 *         name: ID_RATE
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du rate à changer
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Rates'
 *     responses:
 *       204:
 *         description: Envoi réussit d'un nouveau Rate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *       400:
 *         description: Echec lors de la modification du Rate.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageAvecBoolean'
 *             example:
 *               -  resultat: false
 *                  message: "Echec lors de la modification du Rate"
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.put(
  '/:ID_RATE',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  service.PutRate
)

/**
 * @swagger
 * tags:
 *   name: Rates
 *   description: CRUD Rates
 * /rates/{ID_RATE}:
 *   delete:
 *     summary: Permet de supprimer un Rate en fonction de son ID
 *     tags: [Rates]
 *     parameters:
 *       - in: path
 *         name: ID_RATE
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du Rate
 *     responses:
 *       200:
 *         description: La suppression du Rate a réussie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "La suppression du Rate a réussie." 
 *       400:
 *         description: Quelque chose a empêché la suppression du Rate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *             example:
 *               message: "Le Rate d'id 1 n'a pas pu être supprimé, peut-être que cette id n'exite pas ?"             
 *       500:
 *         description: Erreur du serveur interne
 *
 */
router.delete(
  '/:ID_RATE',
  jwtAuthentification.CheckTokenValidity.bind(jwtAuthentification),
  jwtAuthentification.CheckIsOwner.bind(jwtAuthentification),
  service.DeleteRate
);

module.exports = router;