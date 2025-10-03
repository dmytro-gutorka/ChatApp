import { Schema, model, Types } from 'mongoose';

const chatSchema = new Schema({
    contact: {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
    },
    createdBy: { type: Types.ObjectId, ref: 'User' },
    lastMessageAt: { type: Date },
}, { timestamps: true });


chatSchema.index({ 'contact.firstName': 1 });
chatSchema.index({ 'contact.lastName': 1 });


export default model('Chat', chatSchema);