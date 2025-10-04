import express from "express";
import Chat from "../models/Chat.js";
import escapeRegex from "../helpers/escapeRegex.js";
import requireAuth from "../middlewares/requireAuth.js";
import { Types } from 'mongoose'
import Message from "../models/Message.js";

export const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    const search = (req.query?.search || '').trim();
    const createdBy = req.userId; const [fname, lname] = search?.split(' ');

    const ownerFilter = { $or: [
            { createdBy: Types.ObjectId.createFromHexString(createdBy) },
            { isSystem: true}
        ]}

    const nameFilter = search ? { $and: [
        { 'contact.firstName': new RegExp('^' + escapeRegex(fname || ''), 'i') },
            { 'contact.lastName': new RegExp('^' + escapeRegex(lname || ''), 'i') }, ]} : {};

    const chats = await Chat.find({...ownerFilter ,...nameFilter}).sort({ updatedAt: -1 }).lean();

    res.status(200).json({ chats })
})





router.post('/', requireAuth, async (req, res) => {
    console.log(req.body.firstName)
    console.log(req.body.lastName)
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) return res.status(401).json({ message: 'Both first name and last name are required' })

    const createdBy = req.userId;

    const chat = await Chat.create({ createdBy ,contact: { firstName, lastName }, lastMessageAt: null})
    res.status(201).json({ chat });
})


router.patch('/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName } = req.body || {}

    if (!firstName && !lastName) return res.status(400).json({ error: 'Nothing to update' });

    const chat = await Chat.findOneAndUpdate(
        id, {
            $set: {
                ...(firstName ? { 'contact.firstName': firstName } : {}),
                ...(lastName ? { 'contact.lastName': lastName } : {}),
            }
        },
        { new: true }
    ).lean();

    if (!chat) return res.sendStatus(404);

    res.status(200).json({ chat });
})

router.delete('/:id', requireAuth, async (req, res) => {
    const { id: chatId } = req.params;
    const userId  = req.userId

    const filter = {
        _id: chatId,
        $or: [
            { createdBy: Types.ObjectId.createFromHexString(userId) },
            { isSystem: true}
        ] }

    const chat = await Chat.findOneAndDelete(filter)
    if (!chat) return res.sendStatus(404);

    await Message.deleteMany({ chatId })

    res.status(204).end()
})