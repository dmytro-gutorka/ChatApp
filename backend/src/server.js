import { rootRouter } from './routes/index.js';
import { connectDb } from './lib/db.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import passport from './strategies/google.js';
import path from 'path';
import http from 'http';
import { Server as IOServer } from 'socket.io';
import { Types } from 'mongoose';
import Chat from './models/Chat.js';
import Message from './models/Message.js';
import { randomQuote } from './helpers/getRandomQuote.js';

dotenv.config();

const app = express();

const httpServer = http.createServer(app);
const io = new IOServer(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

const port = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : undefined,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', rootRouter);

app.set('io', io);

const autoIntervals = new Map();

io.on('connection', socket => {
  socket.on('join', chatId => socket.join(String(chatId)));
  socket.on('leave', chatId => socket.leave(String(chatId)));

  socket.on('auto:on', async ({ userId }) => {
    if (!userId || !Types.ObjectId.isValid(userId)) return;
    if (autoIntervals.has(socket.id)) return;

    const t = setInterval(async () => {
      try {
        const chats = await Chat.aggregate([
          {
            $match: {
              $or: [{ createdBy: new Types.ObjectId(userId) }, { isSystem: true }],
            },
          },
          { $sample: { size: 1 } },
        ]);

        if (!chats.length) return;
        const chat = chats[0];

        const text = randomQuote();

        const msg = await Message.create({
          chatId: chat._id,
          isSystem: true,
          text,
        });

        await Chat.findByIdAndUpdate(chat._id, {
          $set: {
            lastMessageText: msg.text,
            lastMessageAt: msg.createdAt,
          },
        });

        io.to(String(chat._id)).emit('message:new', {
          contact: {
            firstName: chat.contact.firstName,
            lastName: chat.contact.lastName,
          },
          _id: String(msg._id),
          chatId: String(msg.chatId),
          authorId: null,
          text: msg.text,
          isSystem: true,
          createdAt: msg.createdAt,
        });
      } catch (e) {
        console.log(e);
      }
    }, 2000);

    autoIntervals.set(socket.id, t);
  });

  socket.on('auto:off', () => {
    const t = autoIntervals.get(socket.id);
    if (t) clearInterval(t);
    autoIntervals.delete(socket.id);
  });

  socket.on('disconnect', () => {
    const t = autoIntervals.get(socket.id);
    if (t) clearInterval(t);
    autoIntervals.delete(socket.id);
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get(/^\/(?!api\/v1).*/, (req, res) =>
    res.sendFile(path.join(__dirname, '../frontend/', 'dist', 'index.html'))
  );
}

httpServer.listen(port, async () => {
  console.log(`API + Socket.IO are running on: ${port}`);
  await connectDb();
});
