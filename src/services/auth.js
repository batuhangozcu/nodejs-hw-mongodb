import { User } from '../db/models/User.js';
import { Session } from '../db/models/Session.js';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw createHttpError(409, 'Email already in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return await User.create({ ...payload, password: hashedPassword });
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await Session.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const logoutUser = async (refreshToken) => {
  const session = await Session.findOne({ refreshToken });
  if (!session) {
    throw createHttpError(404, 'Session not found');
  }

  await Session.deleteOne({ refreshToken });

  return { message: 'Successfully logged out' };
};

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

export const refreshUserSession = async (refreshToken) => {
  const session = await Session.findOne({ refreshToken });
  if (!session) {
    throw createHttpError(404, 'Session not found');
  }

  const isSessionExpired = session.refreshTokenValidUntil < new Date();
  if (isSessionExpired) {
    throw createHttpError(401, 'Session expired');
  }

  const newSession = createSession();
  await Session.deleteOne({ refreshToken });

  return await Session.create({
    userId: session.userId,
    ...newSession,
  });
};
