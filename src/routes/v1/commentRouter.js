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

router.get(
  '/replies/:parentCommentId',
  isAuthenticated,
  getAllRepliesController
);

// To fetch all comments (comments and replies)
router.get('/all-comments', isAuthenticated, getAllCommentsOfPostController);

// To fetch only comments
router.get(
  '/comments/:postId',
  isAuthenticated,
  getAllParentCommentsOfPostController
);

router.delete('/delete', isAuthenticated, deleteCommentController);

export default router;
