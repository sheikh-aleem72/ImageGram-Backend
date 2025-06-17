import { StatusCodes } from 'http-status-codes';
import userRepository from '../repositories/userRepository.js';
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationError.js';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../utils/common/authUtils.js';

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
    if (error.name === 'ValidationError') {
      throw new ValidationError(
        {
          error: error.errors
        },
        error.message
      );
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: ['A user with same username or email already exists']
        },
        'A user with same username or email already exists'
      );
    }
    throw error;
  }
};

export const signInService = async (userDetails) => {
  try {
    // 1. Check if user exists or not.
    let user = null;
    if (userDetails.email) {
      user = await userRepository.getUserByEmail(userDetails.email);
    } else if (userDetails.username) {
      user = await userRepository.getUserByUsername(userDetails.username);
    }

    if (!user) {
      throw new ClientError({
        explanation: 'Invalid details send from the client',
        message: `No registered user found with this ${userDetails.email ? 'email' : 'username'}`,
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    // 2. Check if password is valid or not.
    const isValidPassword = bcrypt.compareSync(
      userDetails.password,
      user.password
    );

    if (!isValidPassword) {
      throw new ClientError({
        explanation: 'Invalid details send from the client',
        message: 'Password does not match',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    // 3. verify token
    const token = generateJwtToken({
      email: user.email,
      username: user.username,
      id: user._id
    });

    // 4. Return token
    return {
      username: user.username,
      email: user.email,
      id: user._id,
      token: token
    };
  } catch (error) {
    console.log('Error from signInService', error);
    throw error;
  }
};

export const checkIfUserExists = async (id) => {
  try {
    const response = await userRepository.getById(id);
    return response;
  } catch (error) {
    console.log('Error in checkIfUserExists!', error);
    throw error;
  }
};
