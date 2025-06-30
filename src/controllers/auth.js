import { set } from 'mongoose';
import { THIRTY_DAYS } from '../constants/index.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
} from '../services/auth.js';

export const handleRegister = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered user!',
    data: user,
  });
};

export const handleLogin = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const handleLogout = async (req, res) => {
  if (!req.cookies.refreshToken) {
    return res.status(400).json({
      status: 400,
      message: 'No active session found to log out.',
    });
  }

  await logoutUser(req.cookies.refreshToken);

  res.clearCookie('refreshToken');

  res.status(204).send();
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const handleRefreshSession = async (req, res) => {
  const session = await refreshUserSession(req.cookies.refreshToken);

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
