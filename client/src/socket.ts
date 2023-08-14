import io from 'socket.io-client';

const socket = io('http://localhost:3301');

export default socket;