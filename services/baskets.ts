import { Request, Response } from "express";
import { BasketRepository } from "../Lib/Repositories/BasketRepository";
import { Basket } from "../models/Basket";
import { BasketDTO } from "../Lib/DTO/BasketDTO";

export default class Baskets {

    // Properties
    _repository: BasketRepository;

    // Constructor
    constructor() {
        this._repository = new BasketRepository;
    }

    // GET
    public async GetAll(req: Request, res: Response) {
        try {
            await this._repository.GetAllBasket()
                .then((data: Basket[]) => {
                    if (data != null && data.length > 0) {
                        res.status(200).send(data);
                    } else {
                        res.status(204).send();
                    }
                }).catch((err: { message: any; }) => {
                    res.status(400).send({
                        message: err.message || "Une erreur s'est produite lors de la récupération de tous les paniers."
                    })
                })
        } catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de la récupération de tous les paniers."
            })
        }
    }

    public async GetById(req: Request, res: Response) {
        if (parseInt(req.params.ID) > 0) {
            try {
                await this._repository.GetBasketById(req.params.ID)
                    .then((data: Basket | null) => {
                        if (data != null) {
                            res.status(200).send(data);
                        } else {
                            res.status(204).send();
                        }
                    }).catch((err: { message: any; }) => {
                        res.status(400).send({
                            message: err.message || `Un problème s'est produit lors de la récupéraion du panier d'id: ${req.params.ID}`
                        })
                    })
            } catch (error: any) {
                res.status(500).send({
                    message: `Un problème s'est produit lors de la récupéraion du panier d'id: ${req.params.ID}`
                })
            }
        }
    }

    // POST
    public async PostNewBasket(req: Request, res: Response) {
        let newBasket: BasketDTO = new BasketDTO();
        newBasket.ID_USER = req.body.ID_USER;
        newBasket.ID_PRODUCT = req.body.ID_PRODUCT;
        newBasket.DATE = req.body.DATE;
        try {
            await this._repository.PostNewBasket(newBasket)
                .then(() => res.status(201).send())
                .catch((err: { message: any; }) => {
                    res.status(400).send({
                        message: err.message || "Une erreur s'est produite lors de l'insertion du nouveau panier"
                    })
                })
        } catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de l'insertion du nouveau panier"
            })
        }
    }

    // PUT
    public async PutBasket(req: Request, res: Response) {
        try {
            let basketToModify: BasketDTO = new BasketDTO();
            basketToModify.ID_USER = req.body.ID_USER;
            basketToModify.ID_PRODUCT = req.body.ID_PRODUCT;
            basketToModify.DATE = req.body.DATE;
            await this._repository.PutBasket(basketToModify)
                .then(() => res.status(201).send())
                .catch((err: { message: any; }) => {
                    res.status(400).send({
                        message: err.message || `Une erreur s'est produite lors de la modification du panier d'id : ${req.params.ID}`
                    })
                })
        } catch (error: any) {
            res.status(500).send({
                message: error.message || `Une erreur s'est produite lors de la modification du panier d'id : ${req.params.ID}`
            })
        }
    }

    // DELETE
    public async DeleteBasket(req: Request, res: Response) {
        try {
            if (parseInt(req.params.ID) > 0) {
                this._repository.DeleteBasket(req.params.ID)
                    .then(rowDeleted => {
                        if (rowDeleted == 1) {
                            res.status(200).send({
                                message: `Le panier d'ID ${req.params.ID} a bien été supprimé`
                            })
                        } else {
                            res.status(400).send({
                                message: `Le panier d'ID ${req.params.ID} n'a pas été supprimé (rowDeleted = ${rowDeleted})`
                            });
                        }
                    }).catch((err: { message: any; }) => {
                        res.status(400).send({
                            message: err.message || "Une erreur s'est produite lors de la suppression du panier."
                        })
                    })
            } else {
                res.status(400).send({
                    message: `L'ID donné : ${req.params.ID} n'est pas correct.`
                })
            }
        } catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de la suppression du panier."
            })
        }
    }
}