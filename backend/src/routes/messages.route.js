import express from 'express'
import requireAuth from "../middlewares/requireAuth.js";
import Message from "../models/Message.js";
import { Types } from 'mongoose'

export const router = express.Router()

router.get('/:id/messages', requireAuth, async (req, res) => {
    const { id } = req.params;
    const userId = req.userId

    console.log(id, userId)

    const messages = await Message.find({ $and: [
            {chatId: Types.ObjectId.createFromHexString(id)},
            { $or: [
                    {authorId: Types.ObjectId.createFromHexString(userId)},
                    {isSystem: true}
                ]}
        ]}).populate('chatId').sort({createdAt: 1}).lean()

    console.log(messages)
    res.status(200).json(messages)
})

router.post('/:id/messages', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.userId;

    await Message.create({
        chatId: Types.ObjectId.createFromHexString(id),
        authorId: Types.ObjectId.createFromHexString(userId),
        text,
    })

    res.status(201).json({ message: 'Message sent'})
})