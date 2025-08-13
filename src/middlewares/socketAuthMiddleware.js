import jwt from 'jsonwebtoken';

import { JWT_SECRET_KEY } from '../config/serverConfig.js';

export const socketAuthMiddleware = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('Authentication token missing'));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    socket.userId = decoded.id; // Attach userId to socket object
    next(); // Allow connection
  } catch (err) {
    console.error('Socket auth failed:', err.message);
    return next(new Error('Invalid or expired token'));
  }
};
