import requireAuth from "../middlewares/requireAuth.js";

import { router as authRouter } from './auth.route.js';
import { router as messagesRouter } from './messages.route.js';
import { router as chatsRouter } from './chats.route.js';


import express from "express";

const router = express.Router();


router.use('/chats', requireAuth ,chatsRouter);
router.use('/chats', requireAuth, messagesRouter);
router.use('/auth', authRouter);


export { router as rootRouter }