import {ConversationDocument} from '../IModels/ConversationAttribute';
import mongoose, { Document, Model, Schema } from 'mongoose';

const conversationSchema: Schema = new mongoose.Schema({
    members: { type: Array, required: true },
    
  });

  export const Conversation: Model<ConversationDocument> = mongoose.model<ConversationDocument>('Conversation', conversationSchema);