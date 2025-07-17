import express from 'express';

import { feedController } from '../../controller/feedController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', isAuthenticated, feedController);

export default router;
