import express from 'express';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { fetchAllNotificationsController } from '../../controller/notificationController.js';

const router = express.Router();

router.get('/:receiverId', isAuthenticated, fetchAllNotificationsController);

export default router;
