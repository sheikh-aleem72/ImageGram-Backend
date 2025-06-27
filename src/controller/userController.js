import { StatusCodes } from 'http-status-codes';

import {
  getUserService,
  signInService,
  signUpService,
  updateBioService,
  updateGenderService,
  updateNameService,
  updatePrivacyService
} from '../services/userService.js';
import {
  errorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject.js';

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
    if (error.statusCode) {
      return res.status(error.statusCode).json(errorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const signInController = async (req, res) => {
  try {
    const response = await signInService(req.body);

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'User signed in successfully!'));
  } catch (error) {
    console.log('Error in signInController : ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const updateNameController = async (req, res) => {
  try {
    console.log('Req.body.name: ', req.body.name);
    const name = req.body.name;
    const response = await updateNameService(req.user.id, name);

    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'Name updated successfully!'));
  } catch (error) {
    console.log('Error in updateNameController : ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const getUserController = async (req, res) => {
  try {
    const response = await getUserService(req.user.id);

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'User details fetched!'));
  } catch (error) {
    console.log('Error in getUserController : ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const updateBioController = async (req, res) => {
  try {
    const response = await updateBioService(req.user.id, req.body?.bio);

    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'Bio updated successfully!'));
  } catch (error) {
    console.log('Error in updateBioController : ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const updatePrivacyController = async (req, res) => {
  try {
    const response = await updatePrivacyService(
      req.user.id,
      req.body?.privacyStatus
    );

    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'Privacy status updated successfully!'));
  } catch (error) {
    console.log('Error in updatePrivacyController : ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const updateGenderController = async (req, res) => {
  try {
    const response = await updateGenderService(req.user.id, req.body?.gender);

    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'Gender updated successfully!'));
  } catch (error) {
    console.log('Error in updateGenderController : ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};
