import express from 'express';

import {
  getUserController,
  removeProfilePictureController,
  signInController,
  signUpController,
  updateBioController,
  updateGenderController,
  updateNameController,
  updatePrivacyController,
  updateProfilePictureController,
  updateUserDetailsController
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

router.get('/:userId', isAuthenticated, getUserController);

router.post('/update', isAuthenticated, updateUserDetailsController);

router.post('/updatename', isAuthenticated, updateNameController);

router.post('/updatebio', isAuthenticated, updateBioController);

router.post('/updateprivacy', isAuthenticated, updatePrivacyController);

router.post('/updategender', isAuthenticated, updateGenderController);

router.post(
  '/updateprofilepicture',
  isAuthenticated,
  updateProfilePictureController
);

router.post(
  '/removeprofilepicture',
  isAuthenticated,
  removeProfilePictureController
);

export default router;
