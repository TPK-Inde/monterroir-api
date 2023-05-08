import { ConversationRepository } from "../Lib/Repositories/ConversationRepository";
import { ConversationDocument } from "../Lib/IModels/ConversationAttribute"
import { Request, Response } from 'express';
import {Conversation} from "../Lib/DTO/ConversationDTO";

export default class Conversations{

    constructor(){
    }

    
    public async GetAll(req: Request, res: Response) {
        const _conversationRepository = new ConversationRepository();

        try {
            await _conversationRepository.GetAll()
                .then((data: ConversationDocument[]) => {
                    if (data != null && data.length > 0) {
                        res.status(200).send(data)
                    } else {
                        res.status(204).send();
                    }
                })
                .catch((err: { message: any; }) => {
                    res.status(500).send({
                        message: err.message || "Une erreur s'est produite lors de la récupération de toutes les conversations"
                    })
                })
        } catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de la récupération de toutes les conversations"
            })
        }
    }
    public async Post(req: Request, res: Response){
        const _conversationRepository = new ConversationRepository();
        try{
            const item = new Conversation({
                members : [req.body.senderId, req.body.receiverid]
            })

            await _conversationRepository.Post(req.body)
            .then((data : ConversationDocument) => res.status(201).send(data))
            .catch((err: { message: any; }) => {
                res.status(400).send({
                    message: err.message || "Une erreur s'est produite de l'envoi de la nouvelle conversation, l'un des paramètres est NULL"
                })
            })
        }
        catch(err: any){

        }
    }

    public async GetByUser(req:Request, res : Response){
        const _conversationRepository = new ConversationRepository()
        try{
            await _conversationRepository.GetByUser(req.params.id)
                .then((data : ConversationDocument[]) => res.status(200).send(data))
                .catch((err: { message: any; }) => {
                    res.status(500).send({
                        message: err.message || "Une erreur s'est produite lors de la récupération de la conversations"
                    })
                })
        }
        catch(err: any){
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la récupération de la conversations"
            })
        }
    }
}