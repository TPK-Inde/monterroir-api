import {OrderLine} from "../models/OrderLine";
import {Request, Response} from "express";
import {OrderLineRepository} from "../Lib/Repositories/OrderLineRepository";

export default class OrderLines{

    constructor() {}

    public async GetOrderLineById(req : Request, res : Response){
        const orderLineRepository = new OrderLineRepository();
        try{
            if((parseInt(req.params.id) < 0)){
                res.status(400).send({ message: "Format de L'id est incorrect" });
                return;
            }
            await orderLineRepository.GetOrderLineById(req.params.id)
                .then((data : OrderLine | null) => {
                    if(data){
                        res.status(200).send(data);
                    }else{
                        res.status(204);
                    }

                })
                .catch((err : {message : any}) => {
                    res.status(500).send({
                        message : err.message || "Une erreur s'est produite lors de la récupération de la ligne de commande"
                    });
                })
        }
        catch(err :any){
            res.status(500).send({
                message : err.message || "Une erreur s'est produite lors de la récupération de la ligne de commande"
            });
        }
    }

    public async GetOrderLinesByOrderHeaderId(req : Request, res : Response){

        const orderLineRepository = new OrderLineRepository();

        if((parseInt(req.params.id) < 0)){
            res.status(400).send({ message: "Format de L'id est incorrect" });
            return;
        }
        try{
            await orderLineRepository.GetOrderLinesByOrderHeaderId(req.params.id)
            .then((data : OrderLine[]) => {
                if(data){
                    res.status(200).send(data);
                }else{
                    res.status(204).send(data);
                }
            })
            .catch((err : {message : any}) => {
                res.status(500).send({
                    message : err.message || "Une erreur s'est produite lors de la récupération de tout les lignes de commandes"
                });
            })
        }
        catch(err : any){
            res.status(500).send({
                message : err.message || "Une erreur s'est produite lors de la récupération des lignes de commande"
            });
        }
    }

    public async PostNewOrderLine(req: Request, res : Response){

        const orderLineRepository = new OrderLineRepository();
        const validatedData = await this.checkDataIntegrity(req.body)

        if(validatedData){
            console.log(validatedData)
            res.status(400).send({message : validatedData});
            return;
        }
        try{
            req.body.ID_ORDER_LINE = 0
            await orderLineRepository.PostNewOrderLine(req.body)
            .then(() => {
                res.status(201).send({message : "Création de la ligne de commande réussit"});
            })
            .catch((err : any) => {
                res.status(500).send({
                    message : err.message || "Une erreur s'est produite lors de la création de la ligne de commande"
                });
            })
        }
        catch (err : any){
            res.status(500).send({
                message : err.message || "Une erreur s'est produite lors de la création de la ligne de commande"
            });
        }
    }

    public async PutOrderLine(req : Request, res : Response){
        const orderLineRepository = new OrderLineRepository();

        const idOrderLine = req.params.id;

        if(!idOrderLine){
            res.status(400).send({message : "Veuillez entrer un id de ligne de commande à modifier"});
            return;
        }

        const validatedData = await this.checkDataIntegrity(req.body)
        if(validatedData){
            res.status(400).send({message : validatedData});
            return;
        }

        try{
            await orderLineRepository.PutOrderLine(req.body)
            .then(() => {
                res.status(200).send({ message : "Ligne de commande mise à jour"});
            })
            .catch((err : any) => {
                res.status(500).send({
                    message : err.message || "Une erreur s'est produite lors de la modification de la ligne de commande"
                });
            })
        }
        catch(err : any){
            res.status(400).send({
                message : err.message ||"La récupération des données de la ligne de commande avant modification a échouée"
            });
        }
    };

    public async DeleteOrderLine(req : Request, res : Response){
        const orderLineRepository = new OrderLineRepository();

        const idOrderLine = req.params.id;
        if(!idOrderLine){
            res.status(400).send({message : "Veuillez entrer l'id de la ligne de commande à suprrimer"});
            return;
        }
        try{
            await orderLineRepository.DeleteOrderLine(idOrderLine)
                .then((num : number) => {
                    if(num == 1){
                        res.send({message : `${idOrderLine} : La ligne de commande a bien été supprimé.`})
                    }else{
                        res.status(400).send({message : `${idOrderLine} : La ligne de commande n'a pas pu être supprimée, peut-être que cette id n'exite pas ?\``})
                    }
                })
                .catch((err : any) => {
                    res.status(400).send({message : `${idOrderLine} : La ligne de commande n'a pas pu être supprimée, peut-être que cette id n'exite pas ?\``})
                })
        }
        catch(err : any){
            res.status(500).send({message : `${idOrderLine} : Impossible de supprimer la ligne de commande.`})
        }

    }





    private async checkDataIntegrity(orderLineData : OrderLine){
        if(!orderLineData.ID_ORDER_LINE){return "ID_ORDER_LINE"}
        if(!orderLineData.ID_PRODUCT){return "ID_PRODUCT"}
        if(!orderLineData.ID_ORDER_HEADER){return "ID_ORDER_HEADER"}
        if(!orderLineData.ORDER_QUANTITY){return "ORDER_QUANTITY"}

        return null;
    }
}