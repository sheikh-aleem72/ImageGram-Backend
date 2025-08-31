import express from 'express';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { searchController } from '../../controller/searchController.js';

const router = express.Router();

router.get('/', isAuthenticated, searchController);

export default router;
