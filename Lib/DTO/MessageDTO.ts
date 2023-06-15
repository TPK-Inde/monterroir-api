import mongoose, { Document, Model, Schema } from 'mongoose';
import { MessageDocument } from '../IModels/MessageAttribute';

const MessageSchema: Schema = new mongoose.Schema({
    conversationId: { type: String, required: true },
    sender: { type: String, required: true },
    text: { type: String, required: true },
    createdAt : {type : Date, required: true}
  
});

export const Message: Model<MessageDocument> = mongoose.model<MessageDocument>('Message', MessageSchema);