import { StatusCodes } from 'http-status-codes';
import {
  errorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject.js';
import {
  createCommentService,
  deleteCommentService,
  getAllCommentsOfPostService,
  getAllParentCommentsOfPostService,
  getAllRepliesService
} from '../services/commentService.js';

export const createCommentController = async (req, res) => {
  try {
    const response = await createCommentService(
      req.body.postId,
      req.user.id,
      req.body.content,
      req.body.parentCommentId
    );

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Comment create successfully!'));
  } catch (error) {
    console.log('Error createCommentController! : ', error);
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

export const getAllRepliesController = async (req, res) => {
  try {
    const response = await getAllRepliesService(req.body.parentCommentId);

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Replies fetched successfully!'));
  } catch (error) {
    console.log('Error getAllRepliesController! : ', error);
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

export const getAllCommentsOfPostController = async (req, res) => {
  try {
    const response = await getAllCommentsOfPostService(req.body.postId);

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Comments fetched successfully!'));
  } catch (error) {
    console.log('Error getAllCommentsOfPostController! : ', error);
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

export const deleteCommentController = async (req, res) => {
  try {
    const response = await deleteCommentService(req.body.commentId);

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Comments deleted successfully!'));
  } catch (error) {
    console.log('Error deleteCommentController! : ', error);
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

export const getAllParentCommentsOfPostController = async (req, res) => {
  try {
    const response = await getAllParentCommentsOfPostService(req.body.postId);

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Comments fetched successfully!'));
  } catch (error) {
    console.log('Error getAllParentCommentsOfPostController! : ', error);
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
