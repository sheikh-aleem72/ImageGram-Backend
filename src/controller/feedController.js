import { StatusCodes } from 'http-status-codes';

import { feedService } from '../services/feedService.js';
import {
  errorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject.js';

export const feedController = async (req, res) => {
  try {
    const response = await feedService(req.user.id);

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Feed fetched successfully!'));
  } catch (error) {
    console.log('Error in feedController', error);
    if (error.code) {
      return res.status(StatusCodes.BAD_REQUEST).json(errorResponse(error));
    }
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};
