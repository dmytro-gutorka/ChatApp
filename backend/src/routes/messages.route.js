import express from 'express';
import { createMessageWithAutoResponse, getMessages } from '../controllers/messages.controller.js';

export const router = express.Router();

router.get('/:id/messages', getMessages);
router.post('/:id/messages', createMessageWithAutoResponse);
