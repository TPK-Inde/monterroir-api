import { IMessageRepository } from "../IRepositories/IMessageRepository";
import { Message} from "../DTO/MessageDTO";
import { MessageDocument} from "../IModels/MessageAttribute";


export class MessageRepository implements IMessageRepository{

    constructor() {}

    GetAll(): Promise<MessageDocument[]> {
        return Message.find();
    }

    async Post(item : MessageDocument): Promise<MessageDocument> {
        return await Message.create(item);
    }

    GetByConversation(idConversation : string): Promise<MessageDocument[]> {
        return Message.find({
                conversationId : [idConversation]
            
        });
    }

}