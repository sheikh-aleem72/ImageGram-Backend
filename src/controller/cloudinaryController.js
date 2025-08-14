import { StatusCodes } from 'http-status-codes';

import cloudinary from '../config/cloudinaryConfig.js';
import { CLOUDINARY_CLOUD_NAME } from '../config/serverConfig.js';
import {
  errorResponse,
  internalServerError
} from '../utils/common/responseObject.js';

export const getPresignedUrlFromCloudinary = async (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const params = {
      timestamp,
      folder: 'imagegram_images' // Optional: Store images in a folder
    };

    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET
    );

    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    return res.json({
      uploadUrl,
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: params.folder
    });
  } catch (error) {
    console.log('Error generating presigned URL:', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};
