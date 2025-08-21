import express from 'express';

import {
  followUserController,
  getFollowersController,
  getFollowingController,
  relationshipStatusController,
  unfollowUserController
} from '../../controller/followController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', isAuthenticated, followUserController);

router.delete('/', isAuthenticated, unfollowUserController);

router.get('/followers/:targetUserId', isAuthenticated, getFollowersController);

router.get('/following/:targetUserId', isAuthenticated, getFollowingController);

router.get(
  '/relationship/:targetUserId',
  isAuthenticated,
  relationshipStatusController
);

export default router;
