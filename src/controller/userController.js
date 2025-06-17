import { StatusCodes } from 'http-status-codes';

import { signInService, signUpService } from '../services/userService.js';
import {
  errorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject.js';

export const signUpController = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const newUser = await signUpService(email, username, password);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    console.log('Error while registering user: ', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(errorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const signInController = async (req, res) => {
  try {
    const response = await signInService(req.body);

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'User signed in successfully!'));
  } catch (error) {
    console.log('Error in signInController : ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};
