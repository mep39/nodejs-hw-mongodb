import { Router } from 'express';

import * as authControllers from '../controllers/auth.js';

import { resetPasswordSchema } from '../validation/users.js';
import { resetPasswordController } from '../controllers/auth.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import {
  userSignupSchema,
  userSigninSchema,
  requestResetEmailSchema,
} from '../validation/users.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSignupSchema),
  ctrlWrapper(authControllers.registerController),
);

authRouter.post(
  '/login',
  validateBody(userSigninSchema),
  ctrlWrapper(authControllers.loginController),
);

authRouter.post('/refresh', ctrlWrapper(authControllers.refreshController));

authRouter.post('/logout', ctrlWrapper(authControllers.logoutController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(authControllers.requestResetEmailController),
);

authRouter.post(
  // '/reset-password',
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRouter;
