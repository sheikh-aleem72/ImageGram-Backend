import Post from '../schema/postSchema.js';
import crudRepository from './crudRepository.js';

const postRepository = {
  ...crudRepository(Post),

  getUserPosts: async function (userId) {
    const response = await Post.find({ author: userId }).sort({
      createdAt: -1
    });
    return response;
  }
};

export default postRepository;
