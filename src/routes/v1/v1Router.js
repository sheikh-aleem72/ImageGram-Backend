import express from 'express';

import followsRouter from './followsRouter.js';
import likeRouter from './likeRouter.js';
import postRouter from './postRouter.js';
import usersRouter from './usersRouter.js';

const router = express.Router();

router.use('/users', usersRouter);

router.use('/follow', followsRouter);

router.use('/post', postRouter);

router.use('/like', likeRouter);

export default router;
