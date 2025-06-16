import { StatusCodes } from 'http-status-codes';

import { signUpService } from '../services/userService.js';

export const signUpController = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const newUser = await signUpService(email, username, password);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    console.log('Error while registering user: ', error);
  }
};
