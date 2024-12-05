import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import logger from '../utils/logger';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Log all headers for debugging
    logger.debug('Request headers:', { headers: req.headers });

    // Get token from header
    const authHeader = req.headers.authorization;
    logger.debug('Auth header:', { authHeader });

    if (!authHeader?.startsWith('Bearer ')) {
      logger.warn('No Bearer token found in request');
      return res.status(401).json({ message: 'Not authorized' });
    }

    const token = authHeader.split(' ')[1];
    logger.debug('Token extracted:', { token: token.substring(0, 10) + '...' });

    // Log JWT secret for debugging (don't do this in production!)
    logger.debug('JWT Secret:', { 
      secret: process.env.JWT_SECRET || 'your-secret-key',
      usingDefault: !process.env.JWT_SECRET 
    });

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: string };
      logger.debug('Token decoded successfully:', { userId: decoded.id });

      // Get user from token
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] },
      });
      logger.debug('User found:', { user: user?.toJSON() });

      if (!user) {
        logger.warn('No user found for token');
        return res.status(401).json({ message: 'Not authorized' });
      }

      // Attach user to request object
      (req as any).user = user;
      logger.debug('User attached to request, proceeding...');
      next();
    } catch (jwtError) {
      logger.error('JWT verification failed:', { 
        error: jwtError instanceof Error ? jwtError.message : 'Unknown error',
        token: token.substring(0, 10) + '...'
      });
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    logger.error('Auth middleware error:', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    res.status(401).json({ message: 'Not authorized' });
  }
}; 