import { Types } from 'mongoose'
import express from 'express'
import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

export const router = express.Router()

router.get('/:id/messages', async (req, res) => {
    const { id } = req.params;
    const userId = req.userId

    const messages = await Message.find({ $and: [
            {chatId: Types.ObjectId.createFromHexString(id)},
            { $or: [
                    {authorId: Types.ObjectId.createFromHexString(userId)},
                    {isSystem: true}
                ]}
        ]}).populate('chatId').sort({createdAt: 1}).lean()

    res.status(200).json(messages)
})

router.post('/:id/messages', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.userId;

    await Message.create({
        chatId: Types.ObjectId.createFromHexString(id),
        authorId: Types.ObjectId.createFromHexString(userId),
        text,
    })

    await Chat.findByIdAndUpdate(Types.ObjectId.createFromHexString(id), {
        $set: { lastMessageText: text }
    })

    res.status(201).json({ message: 'Message sent'})
})