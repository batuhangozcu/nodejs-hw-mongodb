import Router from 'express';
import {
  handleRegister,
  handleLogin,
  handleLogout,
  handleRefreshSession,
  handleResetEmail,
  handleResetPassword,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerSchema,
  loginSchema,
  resetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(handleRegister),
);

router.post('/login', validateBody(loginSchema), ctrlWrapper(handleLogin));

router.post('/logout', ctrlWrapper(handleLogout));

router.post('/refresh', ctrlWrapper(handleRefreshSession));

router.post(
  '/send-reset-email',
  validateBody(resetEmailSchema),
  ctrlWrapper(handleResetEmail),
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(handleResetPassword),
);

export default router;
