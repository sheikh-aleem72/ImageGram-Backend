import followRepository from '../repositories/followRepository.js';
import userRepository from '../repositories/userRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { getIO } from '../utils/socketUtils/socket.js';
import {
  createFollowRequestService,
  getFollowRequestService
} from './followRequestService.js';
import {
  removeNotificationService,
  sendNotification
} from './notificationService.js';
import { checkIfUserExists } from './userService.js';

export const updateFollowerCount = async (id) => {
  const followerCount = await followRepository.getFollowersCount(id);
  console.log('Follower count: ', followerCount);

  await userRepository.update(id, { followersCount: followerCount });
};

export const updateFollowingCount = async (id) => {
  const followingCount = await followRepository.getFollowingCount(id);

  await userRepository.update(id, { followingCount: followingCount });
};

export const followUserService = async (currentUserId, targetUserId) => {
  try {
    const user = await checkIfUserExists(targetUserId);
    if (!user) {
      throw new ClientError({ message: 'User not found!', status: 404 });
    }

    let response;
    // check if user has private account

    const privacy = user.accountPrivacy;
    if (privacy == 'private') {
      response = await createFollowRequestService(currentUserId, targetUserId);
    } else {
      response = await followRepository.followUser(currentUserId, targetUserId);
      await updateFollowerCount(targetUserId);
      await updateFollowingCount(currentUserId);
    }

    const io = getIO();
    // Notify the user about follow
    await sendNotification(
      {
        type: 'follow',
        sender: currentUserId,
        receiver: targetUserId
      },
      io
    );

    return { privacy, response };
  } catch (error) {
    console.log('Error in followUserService', error);
    throw error;
  }
};

export const unfollowUserService = async (currentUserId, targetUserId) => {
  try {
    const user = await checkIfUserExists(targetUserId);
    if (!user) {
      throw new ClientError({ message: 'User not found!', status: 404 });
    }

    const response = await followRepository.unfollowUser(
      currentUserId,
      targetUserId
    );

    // Remove notification
    await removeNotificationService('follow', targetUserId, currentUserId);

    await updateFollowerCount(targetUserId);
    await updateFollowingCount(currentUserId);

    return response;
  } catch (error) {
    console.log('Error in unfollowUserService', error);
    throw error;
  }
};

export const getFollowersService = async (userId) => {
  try {
    const user = await checkIfUserExists(userId);
    if (!user) {
      throw new ClientError({ message: 'User not found!', status: 404 });
    }

    const response = await followRepository.getFollowers(userId);

    return response;
  } catch (error) {
    console.log('Error in getFollowersService', error);
    throw error;
  }
};

export const getFollowingService = async (userId) => {
  try {
    const user = await checkIfUserExists(userId);
    if (!user) {
      throw new ClientError({ message: 'User not found!', status: 404 });
    }

    const response = await followRepository.getFollowing(userId);

    return response;
  } catch (error) {
    console.log('Error in getFollowingService', error);
    throw error;
  }
};

export const relationshipStatusService = async (
  currentUserId,
  targetUserId
) => {
  try {
    // Check if current user already follow target user
    const isAlreadyFollowing = await isFollowExistsService(
      currentUserId,
      targetUserId
    );

    if (isAlreadyFollowing.length > 0) {
      return {
        relationship: 'Following'
      };
    }

    // Check if account is private and user has sent request
    const isRequested = await getFollowRequestService(
      currentUserId,
      targetUserId
    );

    if (isRequested.length > 0) {
      return {
        relationship: 'Requested',
        data: isRequested
      };
    }

    // If none of above then sent not_following
    return {
      relationship: 'not_following'
    };
  } catch (error) {
    console.log('Error in relationship status service', error);
    throw error;
  }
};

export const isFollowExistsService = async (currentUserId, targetUserId) => {
  const response = await followRepository.isFollowExists(
    currentUserId,
    targetUserId
  );
  return response;
};
