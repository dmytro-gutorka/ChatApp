import {Types} from "mongoose";
import {messagesService} from "../services/messages.service.js";


export async function getMessages(req, res) {
    const { id } = req.params;
    const userId = req.userId;

    const chatId = Types.ObjectId.createFromHexString(id);
    const authorId = Types.ObjectId.createFromHexString(userId);

    const messages = await messagesService.getMessages(chatId, authorId)

    res.status(200).json(messages);

}


export async function createMessageWithAutoResponse(req, res) {
    const { id } = req.params;
    const { text } = req.body;

    const chatId = Types.ObjectId.createFromHexString(id);
    const authorId = Types.ObjectId.createFromHexString(req.userId);

    const io = req.app.get('io');
    const room = String(chatId);

    await messagesService.createMessage(room, io, chatId, authorId, text);
    await messagesService.createAutoResponse(room, io, chatId);

    res.status(201).json({ message: 'Message sent' });
}