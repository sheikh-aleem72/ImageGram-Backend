import express from 'express';

import { signUpController } from '../../controller/userController.js';
import { userSignUpSchema } from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

router.post('/signup', validate(userSignUpSchema), signUpController);

export default router;
