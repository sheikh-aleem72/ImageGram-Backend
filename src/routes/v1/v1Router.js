import express from 'express';

import cloudinaryRouter from './cloudinaryRouter.js';
import commentRouter from './commentRouter.js';
import feedRouter from './feedRouter.js';
import followRequestRouter from './followRequestRouter.js';
import followsRouter from './followsRouter.js';
import likeRouter from './likeRouter.js';
import notificationRouter from './notificationRouter.js';
import postRouter from './postRouter.js';
import usersRouter from './usersRouter.js';
import searchRouter from './searchRouter.js';

const router = express.Router();

router.use('/users', usersRouter);

router.use('/follow', followsRouter);

router.use('/post', postRouter);

router.use('/like', likeRouter);

router.use('/comment', commentRouter);

router.use('/follow-request', followRequestRouter);

router.use('/feed', feedRouter);

router.use('/cloudinary', cloudinaryRouter);

router.use('/notifications', notificationRouter);

router.use('/search', searchRouter);

export default router;
