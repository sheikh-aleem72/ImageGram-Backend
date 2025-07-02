import { getUserSocketId } from './socketEventUtils.js';
import { getIO } from './socket.js';
import { getUnreadNotifications } from '../../services/notificationService.js';

export const notifyUser = async (userId) => {
  const ioInstance = getIO();
  if (!ioInstance) {
    console.warn('Socket.io not initialized!');
  }

  // Get socket id of corressponding user
  const socketId = getUserSocketId(userId);

  // Fetch unread notifications
  const unreadNotifications = await getUnreadNotifications(userId);

  if (!socketId) {
    console.warn(`No active socket for user ${userId}`);
    return;
  }

  if (unreadNotifications.length > 0 && socketId) {
    ioInstance.to(socketId).emit('unread-notifications', unreadNotifications);
  }
};
