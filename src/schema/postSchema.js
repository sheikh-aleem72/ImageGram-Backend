import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    imageUrls: {
      type: [String], // Array of URLs.
      required: true
    },

    caption: {
      type: String,
      trim: true
    },

    commentCount: {
      type: Number,
      default: 0
    },

    likeCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
