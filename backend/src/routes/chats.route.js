import express from 'express';
import { createChat, deleteChat, getChats, updateChat } from '../controllers/chats.controller.js';

export const router = express.Router();

router.get('/', getChats);
router.post('/', createChat);
router.patch('/:id', updateChat);
router.delete('/:id', deleteChat);
