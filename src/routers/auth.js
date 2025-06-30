import Router from 'express';
import {
  handleRegister,
  handleLogin,
  handleLogout,
  handleRefreshSession,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema, loginSchema } from '../validation/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerSchema),
  ctrlWrapper(handleRegister),
);

router.post('/login', validateBody(loginSchema), ctrlWrapper(handleLogin));

router.post('/logout', ctrlWrapper(handleLogout));

router.post('/refresh', ctrlWrapper(handleRefreshSession));

export default router;
