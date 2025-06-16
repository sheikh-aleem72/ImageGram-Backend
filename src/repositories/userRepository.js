import User from '../schema/user.js';
import crudRepository from './crudRepository.js';

const userRepository = {
  ...crudRepository(User),

  signUpUser: async function (data) {
    const newUser = new User(data);
    await newUser.save();
    return newUser;
  }
};

export default userRepository;
