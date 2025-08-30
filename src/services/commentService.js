import { StatusCodes } from 'http-status-codes';

import { commentRepository } from '../repositories/commentRepository.js';
import postRepository from '../repositories/postRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { getIO } from '../utils/socketUtils/socket.js';
import { sendNotification } from './notificationService.js';
import likeRepository from '../repositories/likeRepository.js';
import Like from '../schema/likeSchema.js';

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

export const getAllRepliesService = async (user, parentCommentId) => {
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

    // // Collect all replies Id
    const replyIds = replies.map((r) => r._id.toString());

    // Fetch likes in query
    const likeIds = await Like.find({
      user: user,
      targetId: { $in: replyIds },
      targetType: 'comment'
    }).distinct('targetId');

    // Attach isLiked with each replies
    const repliesWithIds = replies.map((r) => ({
      ...r,
      isLiked: likeIds.some((id) => id.equals(r._id))
    }));

    return repliesWithIds;
  } catch (error) {
    console.log('Error in getAllRepliesService!: ', error);
    throw error;
  }
};

export const getAllCommentsOfPostService = async (user, postId) => {
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

    // Fetch all commentIds
    const commentIds = response.map((r) => r._id.toString());

    // Fetch likes in query
    const likeIds = await Like.find({
      user: user,
      targetId: { $in: commentIds },
      targetType: 'comment'
    }).distinct('targetId');

    // Attach isLiked with comments
    const commentsWithIsLiked = response.map((c) => ({
      ...c,
      isLiked: likeIds.some((id) => id.equals(c._id))
    }));

    return commentsWithIsLiked;
  } catch (error) {
    console.log('Error in getAllCommentsOfPostService!: ', error);
    throw error;
  }
};

export const getAllParentCommentsOfPostService = async (user, postId) => {
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

    // Fetch all commentIds
    const commentIds = response.map((r) => r._id.toString());

    // Fetch likes in query
    const likeIds = await Like.find({
      user: user,
      targetId: { $in: commentIds },
      targetType: 'comment'
    }).distinct('targetId');

    // Attach isLiked with comments
    const commentsWithIsLiked = response.map((c) => ({
      ...c,
      isLiked: likeIds.some((id) => id.equals(c._id))
    }));

    return commentsWithIsLiked;

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
