import { Schema, model, Types } from 'mongoose';

const chatSchema = new Schema({
    contact: {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
    },
    isSystem: { type: Boolean, default: false },
    createdBy: { type: Types.ObjectId, ref: 'User', default: null },
    lastMessageAt: { type: Date },
    lastMessageText: { type: String, default: null},
}, { timestamps: true });


chatSchema.index({ 'contact.firstName': 1 });
chatSchema.index({ 'contact.lastName': 1 });


export default model('Chat', chatSchema);