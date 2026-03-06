import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import { PORT, CLIENT_ORIGIN } from './config.js';
import chatData from './store.js';
import registerMessageHandlers from './handlers/messageHandlers.js';
import registerRoomHandlers from './handlers/roomHandlers.js';

const app = express();

app.use(cors());

const httpServer = app.listen(PORT);

const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.emit('init_data', chatData);

  socket.on('set_username', (username) => {
    socket.username = username;
  });

  registerRoomHandlers(io, socket);
  registerMessageHandlers(io, socket);

  socket.on('disconnect', () => {});
});
