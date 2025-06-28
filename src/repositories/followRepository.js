import Follow from '../schema/followSchema.js';
import crudRepository from './crudRepository.js';

const followRepository = {
  ...crudRepository(Follow),

  followUser: async function (currentUserId, targetUserId) {
    const response = await Follow.create({
      followerUser: currentUserId,
      followingUser: targetUserId
    });

    return response;
  },

  unfollowUser: async function (currentUserId, targetUserId) {
    const response = await Follow.findOneAndDelete({
      followerUser: currentUserId,
      followingUser: targetUserId
    });

    return response;
  },

  getFollowers: async function (userId) {
    const response = await Follow.find({
      followingUser: userId
    }).populate('followerUser', 'username');

    return response;
  },

  getFollowing: async function (userId) {
    const response = await Follow.find({
      followerUser: userId
    }).populate('followingUser', 'username');

    return response;
  }
};

export default followRepository;
