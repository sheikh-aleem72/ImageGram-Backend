import express from 'express';

import {
  getUserController,
  signInController,
  signUpController,
  updateBioController,
  updateGenderController,
  updateNameController,
  updatePrivacyController
} from '../../controller/userController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import {
  userSignInSchema,
  userSignUpSchema
} from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

router.post('/signup', validate(userSignUpSchema), signUpController);

router.post('/signin', validate(userSignInSchema), signInController);

router.get('/getuser', isAuthenticated, getUserController);

router.post('/updatename', isAuthenticated, updateNameController);

router.post('/updatebio', isAuthenticated, updateBioController);

router.post('/updateprivacy', isAuthenticated, updatePrivacyController);

router.post('/updategender', isAuthenticated, updateGenderController);

export default router;
