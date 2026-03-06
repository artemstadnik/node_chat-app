import { randomUUID } from 'node:crypto';
import chatData from '../store.js';

function registerMessageHandlers(io, socket) {
  socket.on('send_message', (message) => {
    const messageWithId = { ...message, id: randomUUID() };

    chatData.messages.push(messageWithId);
    io.to(message.room).emit('receive_message', messageWithId);
  });
}

export default registerMessageHandlers;
