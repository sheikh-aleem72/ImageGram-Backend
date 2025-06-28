import followRepository from '../repositories/followRepository.js';
import ClientError from '../utils/errors/clientError.js';
import { checkIfUserExists } from './userService.js';

export const followUserService = async (currentUserId, targetUserId) => {
  try {
    const user = await checkIfUserExists(targetUserId);
    if (!user) {
      throw new ClientError({ message: 'User not found!', status: 404 });
    }

    const response = await followRepository.followUser(
      currentUserId,
      targetUserId
    );

    return response;
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
