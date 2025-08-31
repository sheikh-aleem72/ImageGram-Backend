import Post from '../schema/postSchema.js';
import { getFollowingService } from './followService.js';

const FEED_PAGE_SIZE = 20;

export const feedService = async (userId) => {
  try {
    // Get following list of user
    let list = await getFollowingService(userId);

    let followingList = [];

    list.forEach((user) => {
      followingList.push(user?.followingUser);
    });

    // Add current user in the list
    followingList.push(userId);

    // Build query
    const query = {
      author: { $in: followingList }
    };

    // Fetch posts with pagination
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .populate('author', 'username profilePicture');

    return posts;
  } catch (error) {
    console.log('Error from feedService!: ', error);
    throw error;
  }
};
