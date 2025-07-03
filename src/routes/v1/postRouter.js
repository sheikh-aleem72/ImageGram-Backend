import express from 'express';

import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getAllPostsOfUserController,
  getPostByIdController,
  updateCaptionOfPostController
} from '../../controller/postController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-post', isAuthenticated, createPostController);

router.get('/get-post/:id', isAuthenticated, getPostByIdController);

router.get('/user/:userId', isAuthenticated, getAllPostsOfUserController);

router.get('/all', isAuthenticated, getAllPostsController);

router.delete('/delete/:id', isAuthenticated, deletePostController);

router.put('/:id', isAuthenticated, updateCaptionOfPostController);

export default router;
