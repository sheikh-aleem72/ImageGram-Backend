import { StatusCodes } from 'http-status-codes';

import { commentRepository } from '../repositories/commentRepository.js';
import likeRepository from '../repositories/likeRepository.js';
import postRepository from '../repositories/postRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { getIO } from '../utils/socketUtils/socket.js';
import { getUserSocketId } from '../utils/socketUtils/socketEventUtils.js';
import { getFollowersService } from './followService.js';
import userRepository from '../repositories/userRepository.js';

export const updatePostCount = async (id, count) => {
  let postCount = await postRepository.getPostCount(id);
  console.log('post Count: ', postCount);

  // update post count when post is created
  if (count > 0) {
    postCount = postCount + 1;
    await userRepository.update(id, { postCount });
    console.log('post count after create: ', postCount);
  } else {
    // update post count when post is removed
    if (postCount === 0) return;
    postCount = postCount - 1;
    await userRepository.update(id, { postCount });
    console.log('post count after delet: ', postCount);
  }
};

export const createPostService = async (urls, userId, caption) => {
  try {
    const newPost = await postRepository.create({
      imageUrls: urls,
      author: userId,
      caption: caption
    });

    // increment post count after create
    await userRepository.update({ _id: userId }, { $inc: { postCount: 1 } });

    // Notify followers about new post
    const followers = await getFollowersService(userId);

    const io = getIO();
    followers.forEach((follower) => {
      const followerId = follower.followerUser._id.toString();
      const socketId = getUserSocketId(followerId);
      io.to(socketId).emit('new-post-notify', {
        author: userId,
        postId: newPost._id
      });
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
    if (post?.author?._id != userId) {
      throw new ClientError({
        message: 'User is not authorized!',
        status: StatusCodes.FORBIDDEN
      });
    }

    // Delete comments
    await commentRepository.deleteMany(id);

    // Delete likes
    await likeRepository.deleteMany(id);

    // decrement post count after delete
    await userRepository.update({ _id: userId }, { $inc: { postCount: -1 } });

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
