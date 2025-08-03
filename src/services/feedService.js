import Post from '../schema/postSchema.js';
import { getFollowingService } from './followService.js';

const FEED_PAGE_SIZE = 20;

export const feedService = async (userId, beforeCursor) => {
  try {
    // Get following list of user
    let list = await getFollowingService(userId);

    let followingList = [];

    list.forEach((user) => {
      followingList.push(user?.followingUser);
    });

    // Build query
    const query = {
      author: { $in: followingList }
    };

    if (beforeCursor) {
      query.createdAt = { $lt: new Date(beforeCursor) };
    }

    // Fetch posts with pagination
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(FEED_PAGE_SIZE)
      .populate('author', 'username profilePicture');

    // Determine next cursor
    let nextCursor = null;
    if (posts.length == FEED_PAGE_SIZE) {
      nextCursor = posts[posts.length - 1].createdAt.toISOString();
    }

    return { posts, nextCursor };
  } catch (error) {
    console.log('Error from feedService!: ', error);
    throw error;
  }
};
