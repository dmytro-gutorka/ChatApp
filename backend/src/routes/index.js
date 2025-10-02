import { router as authRouter } from './auth.route.js';
import { router as messagesRouter } from './messages.route.js';

import express from "express";

const router = express.Router();


router.use('/auth', authRouter);
router.use('/messages', messagesRouter);


export { router as rootRouter }