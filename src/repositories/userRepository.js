import User from '../schema/user.js';
import crudRepository from './crudRepository.js';

const userRepository = {
  ...crudRepository(User),

  signUpUser: async function (data) {
    const newUser = new User(data);
    await newUser.save();
    return newUser;
  },

  getUserByEmail: async function (email) {
    const user = await User.findOne({ email });
    return user;
  },

  getUserByUsername: async function (username) {
    const user = await User.findOne({ username });
    return user;
  }
};
export default userRepository;
