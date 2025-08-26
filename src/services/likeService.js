import { StatusCodes } from 'http-status-codes';

import { commentRepository } from '../repositories/commentRepository.js';
import likeRepository from '../repositories/likeRepository.js';
import postRepository from '../repositories/postRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { getIO } from '../utils/socketUtils/socket.js';
import {
  removeNotificationService,
  sendNotification
} from './notificationService.js';
import Post from '../schema/postSchema.js';

export const updateLikeCount = async (targetId, targetType) => {
  // get likes count
  const likeCount = await likeRepository.getLikeCount(targetId);

  // Update like count of target: 'post' or 'comment'
  if (targetType == 'post') {
    await postRepository.update(targetId, {
      likeCount: likeCount
    });
  } else if (targetType == 'comment') {
    await commentRepository.update(targetId, {
      likeCount: likeCount
    });
  }
};

export const getAuthorOfTarget = async (targetId, targetType) => {
  let target;
  if (targetType == 'post') {
    target = await postRepository.getById(targetId);
  } else if (targetType == 'comment') {
    target = await commentRepository.getById(targetId);
  }

  return target;
};

export const createLikeService = async (user, targetId, targetType) => {
  try {
    // Check if target has been already liked.
    const isLiked = await likeRepository.isLiked({
      user,
      targetId,
      targetType
    });

    if (isLiked) {
      return {
        success: false,
        message: `User has already liked the ${targetType}`
      };
    }

    // Create like
    const response = await likeRepository.create({
      user,
      targetId,
      targetType
    });

    // Update like count of target: 'post' or 'comment'
    await updateLikeCount(targetId, targetType);

    // Get author of target
    const target = await getAuthorOfTarget(targetId, targetType);

    // send notification
    const io = getIO();

    if (user !== target.author._id.toString()) {
      await sendNotification(
        {
          type: 'like',
          sender: user,
          receiver: target.author._id.toString(),
          postId: targetId
        },
        io
      );
    }

    // Return response;
    return response;
  } catch (error) {
    console.log('Error from createLikeService', error);
    throw error;
  }
};

export const deleteLikeService = async (user, targetId, targetType) => {
  try {
    const isLiked = await likeRepository.isLiked({
      user,
      targetId,
      targetType
    });

    if (!isLiked) {
      throw new ClientError({
        message: `User has not liked the ${targetType}`,
        status: StatusCodes.BAD_REQUEST
      });
    }

    let response = await likeRepository.delete(isLiked._id);

    // Get author of target
    const target = await getAuthorOfTarget(targetId, targetType);

    // delete previous notification
    await removeNotificationService('like', user, target.author);

    // Decrement likeCount in Post
    const updatedPost = await Post.findByIdAndUpdate(
      targetId,
      { $inc: { likeCount: -1 } },
      { new: true } // <-- return updated doc
    )
      .populate('author', 'username profilePicture')
      .lean();

    // Add `isLiked` for UI convenience
    updatedPost.isLiked = false;

    return updatedPost;
  } catch (error) {
    console.log('Error from deleteLikeService! ', error);
    throw error;
  }
};

export const getLikeService = async (user, targetId, targetType) => {
  try {
    const response = await likeRepository.isLiked({
      user,
      targetId,
      targetType
    });

    return response;
  } catch (error) {
    console.log('Error from getLikeService', error);
    throw error;
  }
};
