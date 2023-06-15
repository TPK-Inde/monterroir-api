import  { ConversationDocument } from "../../Lib/IModels/ConversationAttribute";

export interface IConversationRepository {

    GetAll(): Promise<ConversationDocument[]>;
    Post(item : ConversationDocument): Promise<ConversationDocument>;
    GetByUser(id : string) : Promise<ConversationDocument[]>;

}