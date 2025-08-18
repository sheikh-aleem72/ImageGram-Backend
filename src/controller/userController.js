import { StatusCodes } from 'http-status-codes';

import {
  getAllUserService,
  getUserService,
  removeProfilePictureService,
  signInService,
  signUpService,
  updateBioService,
  updateGenderService,
  updateNameService,
  updatePrivacyService,
  updateProfilePictureService,
  updateUserDetailsService
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
      return res.status(error.code).json(errorResponse(error));
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
    const response = await getUserService(req.params.userId);

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

export const updateProfilePictureController = async (req, res) => {
  try {
    const response = await updateProfilePictureService(
      req.user.id,
      req.body?.imageURL
    );

    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'Dp updated successfully!'));
  } catch (error) {
    console.log('Error in updateProfilePictureController : ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const removeProfilePictureController = async (req, res) => {
  try {
    console.log('Reaching here!!!');
    const response = await removeProfilePictureService(req.user.id);

    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'Dp removed successfully!'));
  } catch (error) {
    console.log('Error in removeProfilePictureController : ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const updateUserDetailsController = async (req, res) => {
  try {
    const response = await updateUserDetailsService(req.user.id, req.body.data);

    return res
      .status(StatusCodes.ACCEPTED)
      .json(successResponse(response, 'Updated successfully!'));
  } catch (error) {
    console.log('Error in updateUserDetailsController : ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};

export const getAllUserController = async (req, res) => {
  try {
    const response = await getAllUserService();

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Users details fetched!'));
  } catch (error) {
    console.log('Error in getAllUserController : ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};
