import express from 'express';

import { fetchAllNotificationsController } from '../../controller/notificationController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:receiverId', isAuthenticated, fetchAllNotificationsController);

export default router;
