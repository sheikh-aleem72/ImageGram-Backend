import { StatusCodes } from 'http-status-codes';

import {
  createPostService,
  deletePostService,
  getAllPostsOfUserService,
  getAllPostsService,
  getPostByIdService,
  updateCaptionOfPostService
} from '../services/postService.js';
import {
  errorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject.js';

export const createPostController = async (req, res) => {
  try {
    const response = await createPostService(
      req.body.urls,
      req.user.id,
      req.body.caption
    );

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Post created successfully!'));
  } catch (error) {
    console.log('Error from create post controller! ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const getPostByIdController = async (req, res) => {
  try {
    const response = await getPostByIdService(req.user.id, req.params.id);

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Post fetched successfully!'));
  } catch (error) {
    console.log('Error from get post by id controller! ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const getAllPostsOfUserController = async (req, res) => {
  try {
    const response = await getAllPostsOfUserService(req.params.userId);

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Post fetched successfully!'));
  } catch (error) {
    console.log('Error from getAllPostsOfUser controller! ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const getAllPostsController = async (req, res) => {
  try {
    const response = await getAllPostsService();

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Post fetched successfully!'));
  } catch (error) {
    console.log('Error from getAllPosts controller! ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const deletePostController = async (req, res) => {
  try {
    console.log('req.body.postId: ', req.body.postId);
    const response = await deletePostService(req.body.postId, req.user.id);

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'Post deleted successfully!'));
  } catch (error) {
    console.log('Error from deletePostController controller! ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const updateCaptionOfPostController = async (req, res) => {
  try {
    const response = await updateCaptionOfPostService(
      req.params.id,
      req.user.id,
      {
        caption: req.body.caption
      }
    );

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'caption updated successfully!'));
  } catch (error) {
    console.log('Error from updateCaptionOfPostController controller! ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};
