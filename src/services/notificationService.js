import Notification from '../schema/notificationSchema.js';
import {
  getUserSocketId,
  isUserOnline
} from '../utils/socketUtils/socketEventUtils.js';

const PAGE_SIZE = 20;
export const sendNotification = async (
  { type, sender, receiver, postId },
  io
) => {
  try {
    const newNotification = new Notification({
      type,
      sender,
      receiver,
      postId,
      read: false
    });

    await newNotification.save();

    if (isUserOnline(receiver)) {
      const socketId = getUserSocketId(receiver);
      console.log('user is online and sending notification');
      io.to(socketId).emit('notifications', newNotification);
      io.to(socketId).emit('new-notification', {
        count: 1,
        type: newNotification.type
      });
    }
  } catch (error) {
    console.log('Error from send notification service', error);
    throw error;
  }
};

export const fetchAllNotificationsService = async (receiver, beforeCursor) => {
  try {
    const query = {
      receiver
    };

    if (beforeCursor) {
      query.createdAt = { $lt: new Date(beforeCursor) };
    }
    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .populate('sender', 'username profilePicture') // optional
      .populate('postId');

    // Determine next cursor
    let nextCursor = null;
    if (notifications.length == PAGE_SIZE) {
      nextCursor =
        notifications[notifications.length - 1].createdAt.toISOString();
    }

    return { notifications, nextCursor };
  } catch (error) {
    console.log('Error from fetch all notifications service: ', error);
    throw error;
  }
};

export const removeNotificationService = async (type, sender, receiver) => {
  try {
    await Notification.findOneAndDelete({
      type: type,
      sender: sender,
      receiver: receiver
    });
  } catch (error) {
    console.log('Error in remove notification service!', error);
    throw error;
  }
};

export const getUnreadNotifications = async (receiver) => {
  try {
    const response = await Notification.find({
      receiver: receiver,
      read: false
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'username') // optional
      .populate('postId'); // if needed;

    return response;
  } catch (error) {
    console.log('Error in getUnreadNotification service! ', error);
    throw error;
  }
};

export const readNotifications = async (userId) => {
  try {
    await Notification.updateMany(
      { receiver: userId, read: false },
      { $set: { read: true } }
    );
  } catch (error) {
    console.log('Error in read notification service! ', error);
    // Since we are not catching error in socket event, so we are not throwing it.
  }
};
