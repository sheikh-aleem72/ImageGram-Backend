import { StatusCodes } from 'http-status-codes';
import { errorResponse } from '../utils/common/responseObject';
import { verifyJWT } from '../utils/common/authUtils';

export const isAuthenticated = async (req, res, next) => {
  try {
    // 1. Check if JWT token is passed in header.
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(StatusCodes.BAD_GATEWAY).json(
        errorResponse({
          message: 'No token provided',
          explanation: 'Token is required'
        })
      );
    }

    // 2. Verify token.
    const response = verifyJWT(token);
    if (!response) {
      return res.status(StatusCodes.FORBIDDEN).json(
        errorResponse({
          explanation: 'The provided token is invalid',
          message: 'Invalid token'
        })
      );
    }

    // 3. Check if the user is still exist or not
    const user = await checkIfUserExists(response.id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json(
        errorResponse({
          message: 'User not found',
          explanation: `No user found with this ${response.id} id`
        })
      );
    }

    // 4. add user property to the request which will contains email, username, and password
    req.user = response;

    // 5. call the next middleware
    next();
  } catch (error) {
    console.log('Error while authenticating token from isAuthenticate!');
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      return res.status(StatusCodes.FORBIDDEN).json(
        errorReponse({
          explanation: 'Invalid data sent from the client',
          message: 'Invalid auth token provided'
        })
      );
    }
    return res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorReponse(error));
  }
};
