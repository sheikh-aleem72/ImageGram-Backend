import { StatusCodes } from 'http-status-codes';

import followRepository from '../repositories/followRepository.js';
import followRequestRepository from '../repositories/followRequestRepository.js';
import ClientError from '../utils/errors/clientError.js';

export const createFollowRequestService = async (sender, receiver) => {
  try {
    const existing = await followRequestRepository.getRequest(sender, receiver);

    if (existing.length > 0) {
      return existing;
    }

    const request = await followRequestRepository.create({ sender, receiver });

    return request;
  } catch (error) {
    console.log('Error from createFollowRequestService!', error);
    throw error;
  }
};

export const getAllFollowRequestService = async (receiver) => {
  try {
    const requests = await followRequestRepository.getAllRequest(receiver);

    return requests;
  } catch (error) {
    console.log('Error from getAllFollowRequestService!', error);
    throw error;
  }
};

export const getFollowRequestService = async (sender, receiver) => {
  try {
    const request = await followRequestRepository.getRequest(sender, receiver);

    return request;
  } catch (error) {
    console.log('Error from getFollowRequestService!', error);
    throw error;
  }
};

export const acceptFollowRequestService = async (requestId, userId) => {
  try {
    const request = await followRequestRepository.getById(requestId);

    if (userId != request.receiver) {
      throw new ClientError({
        message: 'Unauthorized request',
        status: StatusCodes.UNAUTHORIZED,
        explanation: 'User is not authorized to perform this activity!'
      });
    }

    const response = await followRepository.followUser(
      request.sender,
      request.receiver
    );

    // Remove request from database.
    await followRequestRepository.delete(request._id);

    // We need notify sender about the request status!

    // Return response
    return response;
  } catch (error) {
    console.log('Error from acceptFollowRequestService!', error);
    throw error;
  }
};

export const deleteFollowReqeustService = async (id) => {
  try {
    const response = await followRequestRepository.delete(id);

    return response;
  } catch (error) {
    console.log('Error from deleteFollowReqeustService!', error);
    throw error;
  }
};
