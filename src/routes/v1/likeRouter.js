import express from 'express';

import {
  createLikeController,
  deleteLikeController
} from '../../controller/likeController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', isAuthenticated, createLikeController);

router.delete('/', isAuthenticated, deleteLikeController);

export default router;
