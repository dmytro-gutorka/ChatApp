import { Types } from 'mongoose';
import Chat from '../models/Chat.js';
import { randomQuote } from '../helpers/getRandomQuote.js';
import Message from '../models/Message.js';
import { chatsService } from './chats.service.js';

class SocketsService {
  constructor() {
    this.autoIntervals = new Map();
  }

  joinRoom(socket) {
    socket.on('join', chatId => socket.join(String(chatId)));
  }

  leaveRoom(socket) {
    socket.on('leave', chatId => socket.leave(String(chatId)));
  }

  turnOnRandomMessagesReply(socket, io) {
    socket.on('auto:on', async ({ userId }) => {
      if (!userId || !Types.ObjectId.isValid(userId)) return;
      if (this.autoIntervals.has(socket.id)) return;

      const timer = setInterval(async () => {
        try {
          const chat = await chatsService.getRandomChat(userId);

          const msg = await Message.create({
            chatId: chat._id,
            isSystem: true,
            text: randomQuote(),
          });

          await Chat.findByIdAndUpdate(chat._id, {
            $set: {
              lastMessageText: msg.text,
              lastMessageAt: msg.createdAt,
            },
          });

          this.sendNewMessage(msg, chat, io);
        } catch (e) {
          console.log(e);
        }
      }, 2000);

      this.autoIntervals.set(socket.id, timer);
    });
  }

  turnOffRandomMessagesReply(socket) {
    socket.on('auto:off', () => {
      const timer = this.autoIntervals.get(socket.id);
      if (timer) clearInterval(timer);
      this.autoIntervals.delete(socket.id);
    });
  }

  disconnect(socket) {
    socket.on('disconnect', () => {
      const timer = this.autoIntervals.get(socket.id);
      if (timer) clearInterval(timer);
      this.autoIntervals.delete(socket.id);
    });
  }

  sendNewMessage(msg, chat, io) {
    io.to(String(chat._id)).emit('message:new', {
      contact: {
        firstName: chat.contact.firstName,
        lastName: chat.contact.lastName,
      },
      _id: String(msg._id),
      chatId: String(msg.chatId),
      authorId: null,
      text: msg.text,
      isSystem: true,
      createdAt: msg.createdAt,
    });
  }
}

export const socketsService = new SocketsService();
