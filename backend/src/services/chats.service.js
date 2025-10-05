import { Types } from 'mongoose';
import escapeRegex from '../helpers/escapeRegex.js';
import Chat from '../models/Chat.js';
import Message from '../models/Message.js';

class ChatsService {
  async getChats(search, createdBy) {
    const [fname, lname] = search?.split(' ');

    const ownerFilter = { createdBy: Types.ObjectId.createFromHexString(createdBy) }


    const nameFilter = search
      ? {
          $and: [
            { 'contact.firstName': new RegExp('^' + escapeRegex(fname || ''), 'i') },
            { 'contact.lastName': new RegExp('^' + escapeRegex(lname || ''), 'i') },
          ],
        }
      : {};

    return Chat.find({ ...ownerFilter, ...nameFilter })
      .sort({ updatedAt: -1 })
      .lean();
  }

  async createChat(firstName, lastName, createdBy) {
    return await Chat.create({
      createdBy,
      contact: { firstName, lastName },
      lastMessageAt: null,
    });
  }

  async updateChat(firstName, lastName, id) {
    const chat = await Chat.findOneAndUpdate(
      Types.ObjectId.createFromHexString(id),
      {
        $set: {
          ...(firstName ? { 'contact.firstName': firstName } : {}),
          ...(lastName ? { 'contact.lastName': lastName } : {}),
        },
      },
      { new: true }
    ).lean();

    if (!chat) return chat;
    return chat;
  }

  async deleteChat(chatId, userId) {
    const filter = {
      _id: chatId,
      $or: [{ createdBy: Types.ObjectId.createFromHexString(userId) }, { isSystem: true }],
    };

    const chat = await Chat.findOneAndDelete(filter);
    if (!chat) return chat;

    await Message.deleteMany({ chatId });
    return chat;
  }

  async getRandomChat(userId) {
    const chats = await Chat.aggregate([
      {
        $match: {
          $or: [{ createdBy: new Types.ObjectId(userId) }, { isSystem: true }],
        },
      },
      { $sample: { size: 1 } },
    ]);

    if (!chats.length) return;
    return chats[0];
  }
}

export const chatsService = new ChatsService();
