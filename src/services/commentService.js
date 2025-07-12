import { StatusCodes } from 'http-status-codes';

import { commentRepository } from '../repositories/commentRepository.js';
import postRepository from '../repositories/postRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { getIO } from '../utils/socketUtils/socket.js';
import { sendNotification } from './notificationService.js';

export const updateCommentCount = async (postId) => {
  const commentCount = await commentRepository.getCommentsCount(postId);

  await postRepository.update(postId, { commentCount: commentCount });
};

export const createCommentService = async (
  postId,
  author,
  content,
  parentCommentId
) => {
  try {
    // Check if post exists or not
    const post = await postRepository.getById(postId);
    if (!post) {
      throw new ClientError({
        message: 'Post not found',
        status: StatusCodes.NOT_FOUND
      });
    }

    // If replying, validate parent comment exists
    if (parentCommentId) {
      const parent = await commentRepository.getById(parentCommentId);
      if (!parent) {
        throw new ClientError({
          message: 'parent Comment not found',
          status: StatusCodes.NOT_FOUND
        });
      }
    }

    // Create comment
    const comment = await commentRepository.create({
      postId,
      author,
      content,
      parentComment: parentCommentId || null
    });

    // Populate comment details
    const populatedComment = await comment.populate([
      { path: 'author', select: 'username profilePicture' },
      { path: 'postId', select: 'author' }
    ]);

    // send notification to user
    const isAuthorsComment =
      author == populatedComment.postId.author.toString();

    if (!isAuthorsComment) {
      const io = getIO();

      await sendNotification(
        {
          type: 'comment',
          sender: author,
          receiver: populatedComment.postId.author.toString(),
          postId: populatedComment.postId._id.toString()
        },
        io
      );
    }

    // Update comment count
    await updateCommentCount(postId);

    // return response
    return populatedComment;
  } catch (error) {
    console.log('Error in createCommentService!: ', error);
    throw error;
  }
};

export const getAllRepliesService = async (parentCommentId) => {
  try {
    // Check if the parent comment exists
    const parent = await commentRepository.getById(parentCommentId);
    if (!parent) {
      throw new ClientError({
        message: 'Comment not found',
        status: StatusCodes.NOT_FOUND
      });
    }

    const replies = await commentRepository.getChildComments(parentCommentId);

    return replies;
  } catch (error) {
    console.log('Error in getAllRepliesService!: ', error);
    throw error;
  }
};

export const getAllCommentsOfPostService = async (postId) => {
  try {
    // Check if the post exists
    const post = await postRepository.getById(postId);
    if (!post) {
      throw new ClientError({
        message: 'Post not found',
        status: StatusCodes.NOT_FOUND
      });
    }

    const response = await commentRepository.getAllCommentsOfPost(postId);

    return response;
  } catch (error) {
    console.log('Error in getAllCommentsOfPostService!: ', error);
    throw error;
  }
};

export const getAllParentCommentsOfPostService = async (postId) => {
  try {
    // Check if the post exists
    const post = await postRepository.getById(postId);
    if (!post) {
      throw new ClientError({
        message: 'Post not found',
        status: StatusCodes.NOT_FOUND
      });
    }

    const response = await commentRepository.getAllParentCommentsOfPost(postId);

    return response;
  } catch (error) {
    console.log('Error in getAllParentCommentsOfPostService!: ', error);
    throw error;
  }
};

export const deleteCommentService = async (commentId) => {
  try {
    // Check if the comment exists
    const comment = await commentRepository.getById(commentId);
    if (!comment) {
      throw new ClientError({
        message: 'Comment not found',
        status: StatusCodes.NOT_FOUND
      });
    }

    await commentRepository.deleteComment(commentId);

    await updateCommentCount(comment.postId);

    return '';
  } catch (error) {
    console.log('Error in deleteCommentService!: ', error);
    throw error;
  }
};
