import mongoose from 'mongoose';

/*
 - If you want to know who is following B → query by following: "B"
 - If you want to know whom A is following → query by follower: "A"
*/
const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

// Maintains uniqueness
followSchema.index({ follower: 1, following: 1 }, { unique: true });

const follow = mongoose.model('Follow', followSchema);

export default follow;
