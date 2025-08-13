import express from 'express';

import { getPresignedUrlFromCloudinary } from '../../controller/cloudinaryController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/pre-signed-url', isAuthenticated, getPresignedUrlFromCloudinary); // For presigned url

export default router;
