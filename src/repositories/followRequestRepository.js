import FollowRequest from '../schema/followRequestSchema.js';
import crudRepository from './crudRepository.js';

const followRequestRepository = {
  ...crudRepository(FollowRequest),

  getAllRequest: async function (receiver) {
    const requests = await FollowRequest.find({ receiver: receiver }).populate(
      'sender',
      'username profilePicture'
    );

    return requests;
  },

  getRequest: async function (sender, receiver) {
    const request = await FollowRequest.find({
      sender: sender,
      receiver: receiver
    }).populate('sender', 'username profilePicture');

    return request;
  }
};

export default followRequestRepository;
