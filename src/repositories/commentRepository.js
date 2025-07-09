import crudRepository from './crudRepository.js';
import Comment from '../schema/commentSchema.js';
import mongoose from 'mongoose';

export const commentRepository = {
  ...crudRepository(Comment),

  getChildComments: async function (parentCommentId) {
    const result = await Comment.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(parentCommentId) }
      },
      {
        $graphLookup: {
          from: 'comments',
          startWith: '$_id',
          connectFromField: '_id',
          connectToField: 'parentComment',
          as: 'allReplies'
        }
      },
      {
        $project: {
          _id: 1,
          content: 1,
          author: 1,
          allReplies: 1
        }
      }
    ]);

    const response = await Comment.populate(result[0].allReplies, {
      path: 'author',
      select: 'username profilePicture'
    });

    return response;
  },

  getAllCommentsOfPost: async function (postId) {
    const response = await Comment.find({ postId }).sort({ createdAt: -1 });

    return response;
  },

  getAllParentCommentsOfPost: async function (postId) {
    const response = await Comment.find({ postId, parentComment: null }).sort({
      createdAt: -1
    });

    return response;
  },

  deleteComment: async function (commentId) {
    // Get all child comments recursively
    const result = await Comment.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(commentId) }
      },
      {
        $graphLookup: {
          from: 'comments',
          startWith: '$_id',
          connectFromField: '_id',
          connectToField: 'parentComment',
          as: 'descendants'
        }
      }
    ]);

    if (!result || result.length === 0) {
      throw new Error('Comment not found');
    }

    const allCommentIds = [
      result[0]._id,
      ...(result[0].descendants || []).map((c) => c._id)
    ];

    await Comment.deleteMany({ _id: { $in: allCommentIds } });
  }
};
