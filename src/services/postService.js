import { StatusCodes } from 'http-status-codes';

import { commentRepository } from '../repositories/commentRepository.js';
import likeRepository from '../repositories/likeRepository.js';
import postRepository from '../repositories/postRepository.js';
import ClientError from '../utils/errors/clientError.js';

export const createPostService = async (urls, userId, caption) => {
  try {
    const newPost = await postRepository.create({
      imageUrls: urls,
      author: userId,
      caption: caption
    });

    return newPost;
  } catch (error) {
    console.log('Error from create post service!', error);
    throw error;
  }
};

export const getPostByIdService = async (id) => {
  try {
    const post = await postRepository.getById(id);

    return post;
  } catch (error) {
    console.log('Error from get post by id service!', error);
    throw error;
  }
};

export const getAllPostsOfUserService = async (userId) => {
  try {
    const posts = await postRepository.getUserPosts(userId);

    return posts;
  } catch (error) {
    console.log('Error from getAllPostOfUser service!', error);
    throw error;
  }
};

export const getAllPostsService = async () => {
  try {
    const response = await postRepository.getAll();
    return response;
  } catch (error) {
    console.log('Error from getAllPostsService', error);
    throw error;
  }
};

export const deletePostService = async (id, userId) => {
  try {
    const post = await getPostByIdService(id);
    if (post?.author != userId) {
      throw new ClientError({
        message: 'User is not authorized!',
        status: StatusCodes.FORBIDDEN
      });
    }

    // Delete comments
    await commentRepository.deleteMany(id);

    // Delete likes
    await likeRepository.deleteMany(id);

    const response = await postRepository.delete(id);
    return response;
  } catch (error) {
    console.log('Error from deletePostService', error);
    throw error;
  }
};

export const updateCaptionOfPostService = async (id, userId, data) => {
  try {
    const post = await getPostByIdService(id);
    if (post?.author != userId) {
      throw new ClientError({
        message: 'User is not authorized!',
        status: StatusCodes.FORBIDDEN
      });
    }
    const response = await postRepository.update(id, data);
    return response;
  } catch (error) {
    console.log('Error from updateCaptionOfPostService', error);
    throw error;
  }
};
