import { Request, Response } from 'express';
import { RateRepository } from '../Lib/Repositories/RateRepository';
import { Rate } from '../models/Rate';
import { RateDTO } from '../Lib/DTO/RateDTO';
import { serialize } from 'v8';

class Rates {
    // Constructor
    constructor() { }

    // Get Methods
    public async GetAll(req: Request, res: Response) {
        const repository = new RateRepository();
        try {
            await repository.GetAllRates()
                .then((data: Rate[]) => {
                    if (data != null && data.length > 0) {
                        res.status(200).send(data);
                    } else {
                        res.status(204).send();
                    }
                }).catch((err: { message: any; }) => {
                    res.status(400).send({
                        message: err.message || "Une erreur s'est produite lors de la récupération de tous les Rates"
                    })
                })
        } catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de la récupération de tous les Rates"
            })
        }
    }

    public async GetById(req: Request, res: Response) {
        const repository = new RateRepository();
        if (parseInt(req.params.ID) > 0) {
            try {
                await repository.GetRateById(req.params.ID_RATE)
                    .then((data: Rate | null) => {
                        if (data != null) {
                            res.status(200).send(data);
                        } else {
                            res.status(204).send();
                        }
                    }).catch((err: { message: any; }) => {
                        res.status(400).send({
                            message: err.message || `Une erreur s'est produite lors de la récupération du Rate d'id : ${req.params.ID}`
                        })
                    })
            } catch (error: any) {
                res.status(500).send({
                    message: `Une erreur s'est produite lors de la récupération du Rate d'id : ${req.params.ID}`
                })
            }
        }
    }

    public async GetVitrineRate(req: Request, res: Response) {
        const repository = new RateRepository();
        if (parseInt(req.params.ID_VITRINE) > 0) {
            try {
                await repository.GetVitrineRates(req.params.ID_VITRINE)
                    .then((data: Rate[]) => {
                        if (data != null && data.length > 0) {
                            res.status(200).send(data);
                        } else {
                            res.status(204).send();
                        }
                    }).catch((err: { message: any; }) => {
                        res.status(400).send({
                            message: err.message || `Une erreur s'est produite lors de la récupération des Rates de la vitrine d'ID : ${req.params.ID_VITRINE}`
                        })
                    })
            } catch (error: any) {
                res.status(500).send({
                    message: `Une erreur s'est produite lors de la récupération des Rates de la vitrine d'ID : ${req.params.ID_VITRINE}`
                })
            }
        }
    }

    //Post Method
    public async PostNewRate(req: Request, res: Response) {
        const repository = new RateRepository();
        let newRate: RateDTO = new RateDTO();
        newRate.ID_USER = req.body.ID_USER;
        newRate.ID_VITRINE = req.body.ID_VITRINE;
        newRate.RATE = req.body.RATE;
        newRate.DATE = req.body.DATE;
        try {
            await repository.PostNewRate(newRate)
                .then(() => res.status(204).send())
                .catch((err: { message: any; }) => {
                    res.status(400).send({
                        message: err.message || "Une erreur s'est produite lors de l'insertion du nouveau Rate."
                    })
                })
        } catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de l'insertion du nouveau Rate."
            })
        }
    }

    //Put Method
    public async PutRate(req: Request, res: Response) {
        const repository = new RateRepository();
        try {
            let rateToModify: RateDTO = new RateDTO();
            rateToModify.ID_RATE = parseInt(req.params.ID_RATE);
            rateToModify.ID_USER = req.body.ID_USER;
            rateToModify.ID_VITRINE = req.body.ID_VITRINE;
            rateToModify.RATE = req.body.RATE;
            rateToModify.DATE = req.body.DATE;
            await repository.PutRate(rateToModify)
                .then(() => res.status(204).send())
                .catch((err: { message: any; }) => {
                    res.status(400).send({
                        message: err.message || "Une erreur s'est produite lors de la modification du Rate."
                    })
                })
        } catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de la modification du Rate."
            })
        }
    }

    //Delete Method
    public async DeleteRate(req: Request, res: Response) {
        const repository = new RateRepository();
        try {
            if (parseInt(req.params.ID_RATE) > 0) {
                repository.DeleteRate(req.params.ID_RATE)
                    .then(rowDeleted => {
                        if (rowDeleted == 1) {
                            res.status(200).send({
                                message: `Le Rate d'ID_RATE ${req.params.ID_RATE} a bien été supprimé.`
                            });
                        } else {
                            res.status(400).send({
                                message: `Le Rate d'ID_RATE ${req.params.ID_RATE} n'a pas pu être supprimé (rowDeleted = ${rowDeleted})`
                            });
                        }
                    }).catch((err: { message: any; }) => {
                        res.status(400).send({
                            message: err.message || "Une erreur s'est produite lors de la suppression du Rate."
                        })
                    })
            } else {
                res.status(400).send({
                    message: `L'ID donné : ${req.params.ID_RATE} n'est pas correct.`
                })
            }
        } catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de la suppression du Rate."
            })
        }
    }
}

const service = new Rates();

exports.GetAll = service.GetAll;
exports.GetRateById = service.GetById;
exports.GetVitrineRate = service.GetVitrineRate;
exports.PostNewRate = service.PostNewRate;
exports.PutRate = service.PutRate;
exports.DeleteRate = service.DeleteRate;