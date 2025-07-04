import Like from '../schema/likeSchema.js';
import crudRepository from './crudRepository.js';

const likeRepository = {
  ...crudRepository(Like),

  getAllLikes: async function (targetId) {
    const response = await Like.find({ targetId: targetId });

    return response;
  },

  isLiked: async function (data) {
    const response = await Like.findOne(data);

    return response;
  },

  getLikeCount: async function (targetId) {
    const likeCount = await Like.countDocuments({
      targetId
    });

    return likeCount;
  }
};

export default likeRepository;
