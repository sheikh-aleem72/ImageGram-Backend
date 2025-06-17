import express from 'express';

import {
  signInController,
  signUpController
} from '../../controller/userController.js';
import {
  userSignInSchema,
  userSignUpSchema
} from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

router.post('/signup', validate(userSignUpSchema), signUpController);

router.post('/signin', validate(userSignInSchema), signInController);
export default router;
