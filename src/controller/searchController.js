import { StatusCodes } from 'http-status-codes';
import {
  errorResponse,
  internalServerError,
  successResponse
} from '../utils/common/responseObject.js';
import { searchService } from '../services/searchService.js';

export const searchController = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.json([]); // return empty list if no query
    }

    const response = await searchService(query);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'User details fetched!'));
  } catch (error) {
    console.log('Error from search controller! ', error);
    if (error.status) {
      return res.status(error.status).json(errorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerError(error));
  }
};
