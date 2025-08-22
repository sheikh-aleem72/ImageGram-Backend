import { readNotifications } from '../../services/notificationService.js';
import { notifyUser } from './notification.js';

const userSocketMap = new Map();

export const socketEvents = (socket) => {
  // Join user to its own room to receive new post from followings
  socket.on('join-user-room', (userId, cb) => {
    socket.join(userId);

    cb({
      success: true,
      message: 'Room joined successfully!'
    });
  });

  // Join to socket connection using 'Join' event from postman
  socket.on('Join', async (data, cb) => {
    console.log('User has send his ID - ', data.userId);

    // For Postman test
    // bindUserSocket(data.userId, socket.id);

    await notifyUser(data.userId);

    cb({
      success: true,
      message: 'User has joined successfully'
    });
  });

  socket.on('read-notifications', async (data) => {
    readNotifications(data.userId);
  });
};

export const bindUserSocket = (userId, socketId) => {
  userSocketMap.set(userId, socketId);
};

export const removeUserSocket = (userId) => {
  console.log('User disconnected', userId);

  userSocketMap.delete(userId);
};

export const getUserSocketId = (userId) => {
  return userSocketMap.get(userId);
};

export const isUserOnline = (userId) => {
  return userSocketMap.get(userId);
};

// For testing on postman only
export const removeUserUsingSocketId = (socketId) => {
  const userId = getKeyByValue(userSocketMap, socketId);
  removeUserSocket(userId);
};

function getKeyByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) {
      return key;
    }
  }
  return undefined; // Or handle as needed if value is not found
}
