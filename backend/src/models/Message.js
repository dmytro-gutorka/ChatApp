import { Schema, model, Types } from 'mongoose';

const messageSchema = new Schema(
  {
    chatId: { type: Types.ObjectId, ref: 'Chat', required: true, index: true },
    authorId: { type: Types.ObjectId, ref: 'User', default: null },
    text: { type: String, required: true, trim: true },
    isSystem: { type: Boolean, default: false },
    editedAt: { type: Date },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

messageSchema.index({ chatId: 1, createdAt: 1 });

export default model('Message', messageSchema);
