import mongoose from 'mongoose';

import Comment from '../schema/commentSchema.js';
import crudRepository from './crudRepository.js';

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

    const response = await Comment.populate(result[0].allReplies, [
      {
        path: 'author',
        select: 'username profilePicture'
      },
      {
        path: 'parentComment',
        select: 'author',
        populate: {
          path: 'author', // 👈 populate the author inside parentComment
          select: 'username profilePicture'
        }
      }
    ]);

    return response;
  },

  getAllCommentsOfPost: async function (postId) {
    const response = await Comment.find({ postId }).sort({ createdAt: -1 });

    return response;
  },

  getAllParentCommentsOfPost: async function (postId) {
    let response = await Comment.aggregate([
      {
        $match: {
          postId: new mongoose.Types.ObjectId(postId),
          parentComment: null
        }
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'parentComment',
          as: 'replies'
        }
      },
      {
        $addFields: {
          replyCount: { $size: '$replies' }
        }
      },
      { $project: { replies: 0 } }, // exclude actual replies
      { $sort: { createdAt: -1 } } // ✅ use $sort inside pipeline
    ]);

    // ✅ populate author field manually after aggregate
    response = await Comment.populate(response, {
      path: 'author',
      select: 'username profilePicture'
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
  },

  getCommentsCount: async function (postId) {
    const count = await Comment.countDocuments({ postId });

    return count;
  }
};
