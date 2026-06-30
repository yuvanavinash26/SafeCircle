import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/request.js';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { logger } from '../utils/logger.js';

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; email: string; name: string };
        req.user = decoded;
        return next();
      } catch (tokenError) {
        logger.warn('[Auth Middleware] Invalid JWT token, falling back to MVP default user session');
      }
    }

    // MVP Placeholder: If no valid token is provided, attach default user so React frontend works immediately
    const defaultUser = await User.findOne({ email: 'ananya.sharma@safecircle.io' });
    if (defaultUser) {
      req.user = {
        id: defaultUser._id.toString(),
        email: defaultUser.email,
        name: defaultUser.name,
      };
    } else {
      req.user = {
        id: '668123456789abcdef012345',
        email: 'ananya.sharma@safecircle.io',
        name: 'Ananya Sharma',
      };
    }

    next();
  } catch (error) {
    logger.error('[Auth Middleware] Error in auth middleware:', error);
    next(error);
  }
};
