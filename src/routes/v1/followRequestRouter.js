import express from 'express';

import {
  acceptFollowRequestController,
  createFollowRequestController,
  getAllFollowRequestController,
  getFollowRequestController,
  rejectFollowRequestController
} from '../../controller/followRequestController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/create', isAuthenticated, createFollowRequestController);

router.get('/all-request', isAuthenticated, getAllFollowRequestController);

router.get('/request', isAuthenticated, getFollowRequestController);

router.post('/accept', isAuthenticated, acceptFollowRequestController);

router.delete('/delete', isAuthenticated, rejectFollowRequestController);

router.delete('/reject', isAuthenticated, rejectFollowRequestController);

export default router;
