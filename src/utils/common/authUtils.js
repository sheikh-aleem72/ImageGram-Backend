import jwt from 'jsonwebtoken';

import { EXPIRY, JWT_SECRET_KEY } from '../../config/serverConfig.js';

export const generateJwtToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: EXPIRY
  });

  return token;
};

export const verifyJWT = (token) => {
  try {
    const response = jwt.verify(token.trim(), JWT_SECRET_KEY.trim());
    return response;
  } catch (error) {
    console.error('JWT verification error:', error.message);
    throw error; // Re-throw the error for the middleware to handle
  }
};
