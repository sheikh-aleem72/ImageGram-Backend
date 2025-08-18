import { StatusCodes } from 'http-status-codes';

import {
  followUserService,
  getFollowersService,
  getFollowingService,
  relationshipStatusService,
  unfollowUserService
} from '../services/followService.js';
import {
  errorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject.js';

export const followUserController = async (req, res) => {
  try {
    const response = await followUserService(
      req.user.id,
      req.body.targetUserId
    );

    if (response.privacy == 'private') {
      return res
        .status(StatusCodes.ACCEPTED)
        .json(successResponse(response.response, `Request sent successfully`));
    } else {
      return res
        .status(StatusCodes.CREATED)
        .json(
          successResponse(response.response, `Added follower successfully!`)
        );
    }
  } catch (error) {
    console.log('Error in followUserController', error);
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

export const unfollowUserController = async (req, res) => {
  try {
    const response = await unfollowUserService(
      req.user.id,
      req.body.targetUserId
    );

    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'unfollowed user successfully!'));
  } catch (error) {
    console.log('Error in unfollowUserController', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

// Get the followers list of target user.
export const getFollowersController = async (req, res) => {
  try {
    const response = await getFollowersService(req.body.targetUserId);

    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'Fetched follower list successfully!'));
  } catch (error) {
    console.log('Error in getFollowersController', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

// Get the following list of target user
export const getFollowingController = async (req, res) => {
  try {
    const response = await getFollowingService(req.body.targetUserId);

    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'Fetched following list successfully!'));
  } catch (error) {
    console.log('Error in getFollowingController', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const relationshipStatusController = async (req, res) => {
  try {
    const response = await relationshipStatusService(
      req.user.id,
      req.params.targetUserId
    );

    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Relationship status fetched successfully!')
      );
  } catch (error) {
    console.log('Error form relationship status controller', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};
