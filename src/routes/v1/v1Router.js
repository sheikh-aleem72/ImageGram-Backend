import express from 'express';

import followsRouter from './followsRouter.js';
import usersRouter from './usersRouter.js';

const router = express.Router();

router.use('/users', usersRouter);

router.use('/follow', followsRouter);

export default router;
