import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    targetType: {
      type: String,
      enum: ['post', 'comment', 'reel', 'story'],
      required: true
    }
  },
  { timestamps: true }
);

likeSchema.index({ user: 1, targetId: 1, targetType: 1 }, { unique: true }); // Prevent double likes

const Like = mongoose.model('Like', likeSchema);

export default Like;
