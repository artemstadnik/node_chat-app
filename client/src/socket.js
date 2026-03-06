import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3005';

const socket = io(SERVER_URL);

export default socket;
