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

    await sendNotification(
      {
        type: 'like',
        sender: user,
        receiver: target.author.toString(),
        postId: targetId
      },
      io
    );

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

    // Update like Count
    await updateLikeCount(targetId);

    // Get author of target
    const target = await getAuthorOfTarget(targetId, targetType);

    // delete previous notification
    await removeNotificationService('like', user, target.author);

    // send response
    return response;
  } catch (error) {
    console.log('Error from deleteLikeService! ', error);
    throw error;
  }
};
