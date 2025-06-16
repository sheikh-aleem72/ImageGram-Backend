import userRepository from '../repositories/userRepository.js';

export const signUpService = async (email, username, password) => {
  try {
    const newUser = await userRepository.signUpUser({
      email,
      username,
      password
    });

    return newUser;
  } catch (error) {
    console.log('Error in create user service', error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]; // Get the duplicate field name
      throw {
        status: 400,
        message: `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is already taken.`
      };
    }

    throw error;
  }
};
