import createHttpError from 'http-errors';
import { Session } from '../db/models/Session.js';
import { User } from '../db/models/User.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return next(createHttpError(401, 'Authorization header is missing'));
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];
  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Invalid authorization format'));
  }
  const session = await Session.findOne({ accessToken: token });
  if (!session) {
    return next(createHttpError(401, 'Invalid access token'));
  }

  const isAccessTokenValid = session.accessTokenValidUntil > new Date();
  if (!isAccessTokenValid) {
    return next(createHttpError(401, 'Access token has expired'));
  }

  const user = await User.findById(session.userId);

  if (!user) {
    return next(createHttpError(404, 'User not found'));
  }

  req.user = user;
  next();
};
