import { MessageDocument} from "../IModels/MessageAttribute";
import {ConversationDocument} from "../IModels/ConversationAttribute";

export interface IMessageRepository{

    GetAll() : Promise<MessageDocument[]>;
    Post(item : MessageDocument): Promise<MessageDocument>;
    GetByConversation(id : string) : Promise<MessageDocument[]>;
}