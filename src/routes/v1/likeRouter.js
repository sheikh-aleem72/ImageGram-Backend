import express from 'express';

import {
  createLikeController,
  deleteLikeController,
  getLikeController
} from '../../controller/likeController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', isAuthenticated, createLikeController);

router.delete('/', isAuthenticated, deleteLikeController);

router.get('/', isAuthenticated, getLikeController);

export default router;
