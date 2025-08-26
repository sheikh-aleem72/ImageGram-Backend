import { StatusCodes } from 'http-status-codes';

import {
  createLikeService,
  deleteLikeService,
  getLikeService
} from '../services/likeService.js';
import {
  errorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject.js';

export const createLikeController = async (req, res) => {
  try {
    const response = await createLikeService(
      req.user.id,
      req.body.targetId,
      req.body.type
    );

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Like created successfully!'));
  } catch (error) {
    console.log('Error in createLikeController', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const deleteLikeController = async (req, res) => {
  try {
    const response = await deleteLikeService(
      req.user.id,
      req.body.targetId,
      req.body.type
    );

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Like deleted successfully!'));
  } catch (error) {
    console.log('Error in deleteLikeController', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const getLikeController = async (req, res) => {
  try {
    const response = await getLikeService(
      req.user.id,
      req.query.targetId,
      req.query.type
    );

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Like fetched successfully!'));
  } catch (error) {
    console.log('Error in getLikeController', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};
