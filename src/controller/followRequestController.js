import { StatusCodes } from 'http-status-codes';

import {
  acceptFollowRequestService,
  createFollowRequestService,
  deleteFollowReqeustService,
  getAllFollowRequestService,
  getFollowRequestService
} from '../services/followRequestService.js';
import {
  errorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject.js';

// This controller is only for testing create follow request API using Postman.
export const createFollowRequestController = async (req, res) => {
  try {
    const response = await createFollowRequestService(
      req.user.id,
      req.body.receiver
    );

    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'Created request successfully!'));
  } catch (error) {
    console.log('Error in createFollowRequestController', error);
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

export const getAllFollowRequestController = async (req, res) => {
  try {
    const response = await getAllFollowRequestService(req.user.id);

    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'All requests fetched successfully!'));
  } catch (error) {
    console.log('Error in getAllFollowRequestController', error);
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

export const getFollowRequestController = async (req, res) => {
  try {
    const response = await getFollowRequestService(
      req.user.id,
      req.body.receiver
    );

    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'Request fetched successfully!'));
  } catch (error) {
    console.log('Error in getFollowRequestController', error);
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

export const acceptFollowRequestController = async (req, res) => {
  try {
    const response = await acceptFollowRequestService(req.body.id, req.user.id);

    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'Request accepted successfully!'));
  } catch (error) {
    console.log('Error in acceptFollowRequestController', error);
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

export const rejectFollowRequestController = async (req, res) => {
  try {
    const response = await deleteFollowReqeustService(req.body.id);

    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'Request rejected successfully!'));
  } catch (error) {
    console.log('Error in rejectFollowRequestController', error);
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
