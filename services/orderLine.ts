import {OrderLine} from "../models/OrderLine";
import {Request, Response} from "express";
import {OrderLineRepository} from "../Lib/Repositories/OrderLineRepository";

export default class OrderLines{

    // Properties
    _repository: OrderLineRepository;

    // Constructor
    constructor() {
        this._repository = new OrderLineRepository();
    }

    // GET
    public async GetOrderLineById(req : Request, res : Response){
        try{
            if((parseInt(req.params.id) < 0)){
                res.status(400).send({ message: "Format de L'id est incorrect" });
                return;
            }
            await this._repository.GetOrderLineById(req.params.id)
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
        if((parseInt(req.params.id) < 0)){
            res.status(400).send({ message: "Format de L'id est incorrect" });
            return;
        }
        try{
            await this._repository.GetOrderLinesByOrderHeaderId(req.params.id)
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

    public async GetOrderTotalByOrderHeaderId(req: Request, res: Response) {
        await this.GetTotalSumOfProducts(req, res).then((data) => {
            res.sendStatus(200).send(data)
        }).catch((err: {message: any}) => {
            console.log(err.message)
        })
    }

    // POST
    public async PostNewOrderLine(req: Request, res : Response){
        const validatedData = await this.checkDataIntegrity(req.body)
        if(validatedData){
            console.log(validatedData)
            res.status(400).send({message : validatedData});
            return;
        }
        try{
            req.body.ID_ORDER_LINE = 0
            await this._repository.PostNewOrderLine(req.body)
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

    // PUT
    public async PutOrderLine(req : Request, res : Response){
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
            await this._repository.PutOrderLine(req.body)
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

    // DELETE
    public async DeleteOrderLine(req : Request, res : Response){
        const idOrderLine = req.params.id;
        if(!idOrderLine){
            res.status(400).send({message : "Veuillez entrer l'id de la ligne de commande à suprrimer"});
            return;
        }
        try{
            await this._repository.DeleteOrderLine(idOrderLine)
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

    // Private Method
    private async checkDataIntegrity(orderLineData : OrderLine){
        if(!orderLineData.ID_ORDER_LINE){return "ID_ORDER_LINE"}
        if(!orderLineData.ID_PRODUCT){return "ID_PRODUCT"}
        if(!orderLineData.ID_ORDER_HEADER){return "ID_ORDER_HEADER"}
        if(!orderLineData.ORDER_QUANTITY){return "ORDER_QUANTITY"}
        return null;
    }
    
    private async GetTotalSumOfProducts(req: Request, res: Response) {
        let total: number = 0;
        try {
            const orderLines = await this._repository.GetOrderLinesByOrderHeaderId(req.params.id)
            for(var line of orderLines){
                total += (line.PRICE * line.ORDER_QUANTITY)
            }
            return total;
        } catch(error: any) {
            console.log(error.mesage)
        }
    }
}