import { StatusCodes } from 'http-status-codes';

import { fetchAllNotificationsService } from '../services/notificationService.js';
import {
  errorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject.js';

export const fetchAllNotificationsController = async (req, res) => {
  try {
    const response = await fetchAllNotificationsService(
      req.params.receiverId,
      req.query.beforeCursor
    );
    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'Notifications fetched successfully!'));
  } catch (error) {
    console.log('Error in fetchAllNotificationsController', error);
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
