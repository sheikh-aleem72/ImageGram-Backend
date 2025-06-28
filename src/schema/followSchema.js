import mongoose from 'mongoose';

/*
 - If you want to know who is following B → query by following: "B"
 - If you want to know whom A is following → query by follower: "A"
*/
const followSchema = new mongoose.Schema(
  {
    followerUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    followingUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

// Maintains uniqueness
followSchema.index({ followerUser: 1, followingUser: 1 }, { unique: true });

const Follow = mongoose.model('Follow', followSchema);

export default Follow;
