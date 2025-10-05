import { socketsService } from './services/sockets.service.js';
import { Server as IOServer } from 'socket.io';
import { rootRouter } from './routes/index.js';
import { connectDb } from './lib/db.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

import path from 'path';
import http from 'http';
import {googlePassport} from "./strategies/google.js";
import {facebookPassport} from "./strategies/facebook.js";


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

app.use(googlePassport.initialize());
app.use(googlePassport.session());
//
// app.use(facebookPassport.initialize());
// app.use(facebookPassport.session());

app.use('/api/v1', rootRouter);
app.set('io', io);

io.on('connection', socket => {
  socketsService.joinRoom(socket);
  socketsService.leaveRoom(socket);
  socketsService.turnOnRandomMessagesReply(socket, io);
  socketsService.turnOffRandomMessagesReply(socket);
  socketsService.disconnect(socket);
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
