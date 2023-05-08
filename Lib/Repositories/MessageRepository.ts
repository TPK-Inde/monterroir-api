import { IMessageRepository } from "../IRepositories/IMessageRepository";
import { Message} from "../DTO/MessageDTO";
import { MessageDocument} from "../IModels/MessageAttribute";
import {ConversationDocument} from "../IModels/ConversationAttribute";
import {Conversation} from "../DTO/ConversationDTO";

export class MessageRepository implements IMessageRepository{

    constructor() {}

    async GetAll(): Promise<MessageDocument[]> {
        return Message.find();
    }

    async Post(item : MessageDocument): Promise<MessageDocument> {
        return await Message.create(item);
    }

    async GetByConversation(idConversation : string): Promise<MessageDocument[]> {
        return Message.find({
                conversationId : [idConversation]
            
        });
    }

}