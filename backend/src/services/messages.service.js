import Message from "../models/Message.js";
import Chat from "../models/Chat.js";
import {randomQuote} from "../helpers/getRandomQuote.js";


class MessagesService {

    async getMessages(chatId, authorId) {
        return Message.find({
            $and: [{ chatId }, { $or: [{ authorId }, { isSystem: true }] }],
        })
            .populate('chatId')
            .sort({ createdAt: 1 })
            .lean();
    }

    async createMessage(room, io, chatId, authorId, text) {
        const msg = await Message.create({ chatId, authorId, text });
        await Chat.findByIdAndUpdate(chatId, { $set: { lastMessageText: msg.text } });

        const payload = {
            _id: String(msg._id),
            chatId: String(msg.chatId),
            authorId: String(msg.authorId),
            text: msg.text,
            isSystem: !!msg.isSystem,
            createdAt: msg.createdAt,
        };

        io.to(room).emit('message:new', payload);
    }

    async createAutoResponse(room, io, chatId, messageDelay = 3000) {
        setTimeout(async () => {
            const auto = await Message.create({ chatId, isSystem: true, text: randomQuote() });
            await Chat.findByIdAndUpdate(chatId, { $set: { lastMessageText: auto.text } });

            const payload = {
                _id: String(auto._id),
                chatId: String(auto.chatId),
                authorId: null,
                text: auto.text,
                isSystem: true,
                createdAt: auto.createdAt,
            }

            io.to(room).emit('message:new', payload);
        }, messageDelay);
    }
}

export const messagesService = new MessagesService();