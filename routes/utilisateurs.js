const express = require('express');
const router = express.Router();
const utilisateurs = require('../services/utilisateurs');

/* GET La liste des utilisateurs. */
router.get('/', async function (req, res, next) {
    try {
        res.json(await utilisateurs.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Une erreur c'est produite lors de la récupéreration de tous les utilisateurs `, err.message);
        next(err);
    }
});

/* GET un utilisateur. */
router.get('/:id', async function (req, res, next) {
    try {
        const resultat = await utilisateurs.getOne(req.query.page, req.params.id);
        console.log(resultat.data);

        if (resultat.data.length === 0) {
            res.status(204).json("Aucune données trouvée");
        }
        else {
            res.json(resultat);
        }

    } catch (err) {
        console.error(`Une erreur c'est produite lors de la récupéreration d'un utilisateur `, err.message);
        next(err);
    }
});

/* POST Un nouvelle utilisateur. */
router.post('/', async function (req, res, next) {
    try {
        res.status(201).json(await utilisateurs.ajout(req.body));
    } catch (err) {
        console.error("Une erreur c'est produite lors de la création d'un nouvelle utilisateur", err.message);
        next(err);
    }
});

/* PUT Un utilisateur. */
router.put('/:id', async function (req, res, next) {
    try {
        res.json(await utilisateurs.modification(req.params.id, req.body));
    } catch (err) {
        console.error(`Une erreur c'est produite lors de la modification d'un utilisateur`, err.message);
        next(err);
    }
});

/* DELETE Un utilisateur. */
router.delete('/:id', async function (req, res, next) {
    try {
        res.status(204).json(await utilisateurs.suppression(req.params.id));
    } catch (err) {
        console.error(`Une erreur c'est produite lors de la suppression d'un utilisateur`, err.message);
        next(err);
    }
});

module.exports = router;