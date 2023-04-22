import { OrderHeader } from "../models/OrderHeader";
import { Request, Response } from "express";
import { OrderHeaderRepository } from "../Lib/Repositories/OrderHeaderRepository";


export default class OrderHeaders {

    constructor() { }

    //Fonction permettant de récupérer la liste de tout les en-tetes de commandes
    public async GetAllOrderHeader(req: Request, res: Response) {
        const orderHeaderRepository = new OrderHeaderRepository();
        try {
            await orderHeaderRepository.GetAllOrderHeaders()
                .then((data: OrderHeader[]) => {
                    if (data.length > 0) {
                        res.status(200).send(data);
                    } else {
                        res.status(204).send();
                    }
                })
                .catch((err: { message: any }) => {
                    res.status(500).send({
                        message: err.message || "Une erreur s'est produite lors de la récupération de tout les en-têtes de commandes"
                    });
                });
        }
        catch (err: any) {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération de tout les en-têtes de commandes"
            });
        }
    };

    //Fonction permettant de récupérer un en-tête de commande par son id
    public async GetOrderHeaderById(req: Request, res: Response) {
        const orderHeaderRepository = new OrderHeaderRepository();

        if ((parseInt(req.params.ID_ORDER_HEADER) > 0)) {
            try {
                await orderHeaderRepository.GetOrderHeaderById(req.params.ID_ORDER_HEADER)
                    .then((data: OrderHeader | null) => {
                        if (data) {
                            res.status(200).send(data);
                        } else {
                            res.sendStatus(204);
                        }
                    })
                    .catch((err: { message: any }) => {
                        res.status(500).send({
                            message: err.message || "Une erreur s'est produite lors de la récupération de l'en-tête de commande"
                        })
                    });
            }
            catch (err: any) {
                res.status(500).send({
                    message: err.message || "Une erreur s'est produite lors de la récupération de l'en-tête de commande"
                });
            }
        } else {
            res.status(400).send({ message: "Format de L'id est incorrect" });
        }
    };

    //Fonction permettant de récupérer les en-têtes de commandes d'un utilisateur
    public async GetOrderHeaderByUser(req: Request, res: Response) {
        const orderHeaderRepository = new OrderHeaderRepository()
        if ((parseInt(req.params.ID_USER) > 0)) {
            try {
                await orderHeaderRepository.GetOrderHeadersByUserId(req.params.ID_USER)
                    .then((data: OrderHeader[]) => {
                        if (data) {
                            res.status(200).send(data);
                        }
                        else {
                            res.sendStatus(204);
                        }
                    })
                    .catch((err: { message: any; }) => {
                        res.status(500).send({
                            message: err.message || "Une erreur s'est produite lors de la récupération des en-têtes de commandes d'un utilisateur"
                        });
                    })
            }
            catch (err: any) {
                res.status(500).send({
                    message: err.message || "Une erreur s'est produite lors de la récupération des en-têtes de commandes d'un utilisateur"
                });
            }
        } else {
            res.status(400).send({ message: "Format de L'id est incorrect" });
        }
    };

    //Fonction permettant de récupérer les en-têtes de commandes à partir d'un utilisateur et de son statut
    public async GetOrderHeaderFromUserAndStatus(req: Request, res: Response) {
        const orderHeaderRepository = new OrderHeaderRepository()

        const statusId = req.params.ID_ORDER_STATUS;
        const userId = req.params.ID_USER;

        if (!(parseInt(statusId) < 0)) {
            res.status(400).send({ message: "Format de L'id du statut est incorrect" });
            return;
        }

        if (!(parseInt(userId) < 0)) {
            res.status(400).send({ message: "Format de L'id du statut est incorrect" });
            return;
        }

        try {
            await orderHeaderRepository.GetOrderHeadersFromUserAndStatus(statusId, userId)
                .then((data: OrderHeader[]) => {
                    if (data) {
                        res.status(200).send(data);
                    }
                    else {
                        res.sendStatus(204);
                    }
                })
                .catch((err: { message: any; }) => {
                    res.status(500).send({
                        message: err.message || "Une erreur s'est produite lors de la récupération des en-têtes de commandes"
                    });
                })
        }
        catch (err: any) {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération des en-têtes de commandes"
            });
        }
    }


    //Fonction permettant de créer un en-tête de commande
    public async CreateOrderHeader(req: Request, res: Response) {
        const orderHeaderRepository = new OrderHeaderRepository()
        req.body.DATE = new Date();
        const validatedData = checkDataIntegrity(req.body)
        req.body.ID_ORDER_HEADER = 0

        if (validatedData) {
            res.status(400).send({
                message: validatedData
            })
        } else {
            try {
                await orderHeaderRepository.PostNewOrderHeader(req.body)
                    .then(() => {
                        res.status(201).send({ message: "Création de l'en-tête de commande réussit" });
                    })
                    .catch((err: { message: any }) => {
                        res.status(500).send({
                            message: err.message || "Une erreur s'est produite lors de la création de l'en-tête de commande"
                        });
                    });
            }
            catch (err: any) {
                res.status(500).send({
                    message: err.message || "Une erreur s'est produite lors de la création de l'en-tête de commande"
                });
            }
        }
    };

    //Fonction permettant de mettre à jour un en-tête de commande
    public async UpdateOrderHeader(req: Request, res: Response) {
        const orderHeaderRepository = new OrderHeaderRepository();

        const idOrderHeader = req.params.ID_ORDER_HEADER;

        if (!idOrderHeader) {
            res.status(400).send({ message: "Veuillez entrer un id d'en-tête de commande à modifier" });
        }

        const validatedData = checkDataIntegrity(req.body);
        if (validatedData) {
            res.status(400).send({
                message: validatedData
            });
        } else {
            try {
                await orderHeaderRepository.PutOrderHeader(req.body)
                    .then(() => {
                        res.status(200).send({ message: "En-tête de commande mis à jour" });
                    })
                    .catch((err: { message: any }) => {
                        res.status(500).send({
                            message: err.message || "Une erreur s'est produite lors de la modification de l'en-tête de commande"
                        });
                    })
            }
            catch (err: any) {
                res.status(400).send({
                    message: err.message || "La récupération des données de l'en-tête de commande avant modification a échouée"
                });
            }
        }
    };

    //Fonction permettant de supprimer un en-tête de commande
    public async DeleteOrderHeader(req: Request, res: Response) {
        const orderHeaderRepository = new OrderHeaderRepository();

        const idOrderHeader = req.params.ID_ORDER_HEADER;
        if (!idOrderHeader) {
            res.status(400).send({ message: "Veuillez entrer un id d'en-tête de commande à suprrimer" });
        }
        try {
            await orderHeaderRepository.DeleteOrderHeader(idOrderHeader)
                .then((num: number) => {
                    if (num == 1) {
                        res.send({ message: `${idOrderHeader} : L'en-tête de commande a bien été supprimé.` })
                    } else {
                        res.status(400).send({ message: `${idOrderHeader} : L'en-tête de commande n'a pas pu être supprimée, peut-être que cette id n'exite pas ?\`` })
                    }
                })
                .catch((err: { message: string }) => {
                    res.status(500).send({ message: `${idOrderHeader} : Impossible de supprimer l'en-tête de commande.` })
                })
        }
        catch (err: any) {
            res.status(500).send({ message: `${idOrderHeader} : Impossible de supprimer l'en-tête de commande.` })
        }

    }
}
//Fonction permettant de vérifier l'intégrité des données
function checkDataIntegrity(orderHeaderData: OrderHeader) {
    if (!orderHeaderData.ID_ORDER_HEADER) { return "ID_ORDER_HEADER" }
    if (!orderHeaderData.ID_ORDER_STATUS) { return "ID_ORDER_STATUS" }
    if (!orderHeaderData.ID_USER) { return "ID_USER" }

    return null;
}
