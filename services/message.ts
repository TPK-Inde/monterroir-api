import { MessageRepository } from "../Lib/Repositories/MessageRepository";
import { MessageDocument } from "../Lib/IModels/MessageAttribute";
import { Request, Response } from 'express';
import { Message } from "../Lib/DTO/MessageDTO";
import {ConversationRepository} from "../Lib/Repositories/ConversationRepository";
import {ConversationDocument} from "../Lib/IModels/ConversationAttribute";
import {Conversation} from "../Lib/DTO/ConversationDTO";
import { log } from "console";

export default class Messages{

    constructor() {}

    public async GetAll(req: Request, res: Response) {
        const _messageRepository = new MessageRepository();

        try {
            await _messageRepository.GetAll()
                .then((data: MessageDocument[]) => {
                    if (data != null && data.length > 0) {
                        res.status(200).send(data)
                    } else {
                        res.status(204).send();
                    }
                })
                .catch((err: { message: any; }) => {
                    res.status(500).send({
                        message: err.message || "Une erreur s'est produite lors de la récupération de tout les messages"
                    })
                })
        } catch (error: any) {
            res.status(500).send({
                message: error.message || "Une erreur s'est produite lors de la récupération de tout les messages"
            })
        }
    }
    public async GetByConversation(req: Request, res :Response){
        const _messageRepository = new MessageRepository();
        try{
            console.log(req.params);
            
            await _messageRepository.GetByConversation(req.params.conversationId)
            .then((data: MessageDocument[]) => {
                console.log(data);
                
                if (data != null && data.length > 0) {
                    res.status(200).send(data)
                } else {
                    res.status(204).send();
                }
            })
            .catch((err: { message: any; }) => {
                res.status(500).send({
                    message: err.message || "Une erreur s'est produite lors de la récupération de tout les messages"
                })
            })
        }
        catch(e){
            console.log(e);
            
        }
    }

    public async Post(req: Request, res: Response){
        const _messageRepository = new MessageRepository();
        try{
            const item = new Conversation({
                members : [req.body.senderId, req.body.receiverid]
            })

            await _messageRepository.Post(req.body)
                .then((data : MessageDocument) => res.status(201).send(data))
                .catch((err: { message: any; }) => {
                    res.status(400).send({
                        message: err.message || "Une erreur s'est produite de l'envoi du nouveau message, l'un des paramètres est NULL"
                    })
                })
        }
        catch(err: any){

        }
    }
}