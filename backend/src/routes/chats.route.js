import express from "express";
import Chat from "../models/Chat";
import escapeRegex from "../helpers/escapeRegex.js";


const router = express.Router();

router.get('/', async (req, res) => {
    const search = req.query.search.trim();
    const filter = search
        ? { $or: [
                { 'contact.firstName': new RegExp('^' + escapeRegex(search), 'i') },
                { 'contact.lastName': new RegExp('^' + escapeRegex(search), 'i') },
            ] }
        : {};
    const chats = await Chat.find(filter).sort({ updatedAt: -1 }).lean();
    res.json({ chats });
})


router.post('/', async (req, res) => {
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) return res.status(401).json({ message: 'Both first name and last name are required' })

    const chat = await Chat.create({ contact: { firstName, lastName }, lastMessageAt: null})
})