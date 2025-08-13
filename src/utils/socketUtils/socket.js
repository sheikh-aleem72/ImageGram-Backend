import { notifyUser } from './notification.js';
import {
  bindUserSocket,
  removeUserSocket,
  // removeUserUsingSocketId,
  socketEvents
} from './socketEventUtils.js';
let ioInstance = null;

// initialize io
export const setupSocket = (io) => {
  ioInstance = io;
  ioInstance.on('connection', async (socket) => {
    console.log('An user is connected with id - ', socket.id, socket.userId);

    // For frontend

    // Bind user with socket in map
    bindUserSocket(socket.userId, socket.id);

    // Notify user about unread notifications
    notifyUser(socket.userId);

    socketEvents(socket);

    socket.on('disconnect', () => {
      // For frontend
      removeUserSocket(socket.userId);

      // For postman
      // console.log('User disconnected with socket id: ', socket.id);
      // removeUserUsingSocketId(socket.id);
    });
  });
};

// make IO instance available globally
export const getIO = () => {
  if (!ioInstance) {
    throw new Error('Socket.io not initialized!');
  }

  return ioInstance;
};
