import express from 'express';
import {
  createCommentController,
  deleteCommentController,
  getAllCommentsOfPostController,
  getAllParentCommentsOfPostController,
  getAllRepliesController
} from '../../controller/commentController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', isAuthenticated, createCommentController);

router.get('/replies', isAuthenticated, getAllRepliesController);

router.get('/all-comments', isAuthenticated, getAllCommentsOfPostController);

router.get('/comments', isAuthenticated, getAllParentCommentsOfPostController);

router.delete('/delete', isAuthenticated, deleteCommentController);

export default router;
