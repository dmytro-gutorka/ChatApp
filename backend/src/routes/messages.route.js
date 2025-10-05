import { randomQuote } from '../helpers/getRandomQuote.js';
import { Types } from 'mongoose';
import express from 'express';
import Message from '../models/Message.js';
import Chat from '../models/Chat.js';

export const router = express.Router();

router.get('/:id/messages', async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const chatId = Types.ObjectId.createFromHexString(id);
  const authorId = Types.ObjectId.createFromHexString(userId);

  const messages = await Message.find({
    $and: [{ chatId }, { $or: [{ authorId }, { isSystem: true }] }],
  })
    .populate('chatId')
    .sort({ createdAt: 1 })
    .lean();

  res.status(200).json(messages);
});

router.post('/:id/messages', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const chatId = Types.ObjectId.createFromHexString(id);
  const authorId = Types.ObjectId.createFromHexString(req.userId);

  const msg = await Message.create({ chatId, authorId, text });
  await Chat.findByIdAndUpdate(chatId, { $set: { lastMessageText: msg.text } });

  const io = req.app.get('io');
  const room = String(chatId);
  const payload = {
    _id: String(msg._id),
    chatId: String(msg.chatId),
    authorId: String(msg.authorId),
    text: msg.text,
    isSystem: !!msg.isSystem,
    createdAt: msg.createdAt,
  };

  io.to(room).emit('message:new', payload);

  setTimeout(async () => {
    const auto = await Message.create({ chatId, isSystem: true, text: randomQuote() });
    await Chat.findByIdAndUpdate(chatId, { $set: { lastMessageText: auto.text } });

    io.to(room).emit('message:new', {
      _id: String(auto._id),
      chatId: String(auto.chatId),
      authorId: null,
      text: auto.text,
      isSystem: true,
      createdAt: auto.createdAt,
    });
  }, 3000);

  res.status(201).json({ message: 'Message sent' });
});
