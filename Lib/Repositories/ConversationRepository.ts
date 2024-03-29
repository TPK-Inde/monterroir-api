import { IConversationRepository } from '../IRepositories/IConversationRepository'
import { Conversation} from '../DTO/ConversationDTO'
import { ConversationDocument } from '../IModels/ConversationAttribute';

export class ConversationRepository implements IConversationRepository{


    constructor(){}

    GetAll(): Promise<ConversationDocument[]> {
        return Conversation.find();
    }

    async Post(item : ConversationDocument): Promise<ConversationDocument>{
        return await Conversation.create(item);
    }

    GetByUser(id : string): Promise<ConversationDocument[]>{
        return Conversation.find({
            members : {
                $in : [id]
            }
        });
    }
}