export interface MessageDocument extends Document {
    conversationId : String,
    sender : String,
    text : String
    createdAt : Date
}