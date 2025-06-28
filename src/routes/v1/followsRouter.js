import express from 'express';

import {
  followUserController,
  getFollowersController,
  getFollowingController,
  unfollowUserController
} from '../../controller/followController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', isAuthenticated, followUserController);

router.delete('/', isAuthenticated, unfollowUserController);

router.get('/followers', isAuthenticated, getFollowersController);

router.get('/following', isAuthenticated, getFollowingController);

export default router;
