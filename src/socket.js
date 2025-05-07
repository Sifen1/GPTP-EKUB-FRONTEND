import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  transports: ['websocket'], // force websocket only
});

export default socket;
