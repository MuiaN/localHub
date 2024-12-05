import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import logger from '../utils/logger';

interface UserResponse {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    logger.debug('Register attempt:', { name, email });

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      logger.warn('Registration failed - email already exists:', { email });
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });
    logger.debug('User created:', { userId: user.id });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    logger.debug('Generated token for new user:', { userId: user.id, token: token.substring(0, 10) + '...' });

    // Return user data and token (excluding password)
    const userData = user.toJSON() as UserResponse;
    delete userData.password;

    res.status(201).json({
      user: userData,
      token,
    });
  } catch (error) {
    logger.error('Registration error:', { error: error instanceof Error ? error.message : 'Unknown error' });
    res.status(500).json({ message: 'Failed to register user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    logger.debug('Login attempt:', { email, body: req.body });

    if (!email || !password) {
      logger.warn('Login failed - missing credentials:', { email, password: !!password });
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    logger.debug('User lookup result:', { found: !!user, email });

    if (!user) {
      logger.warn('Login failed - user not found:', { email });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    logger.debug('Password validation:', { isValid: isValidPassword });

    if (!isValidPassword) {
      logger.warn('Login failed - invalid password:', { email });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    logger.debug('Generated token for user:', { 
      userId: user.id, 
      token: token.substring(0, 10) + '...',
      jwtSecret: process.env.JWT_SECRET ? 'set' : 'using default'
    });

    // Return user data and token (excluding password)
    const userData = user.toJSON() as UserResponse;
    delete userData.password;

    logger.debug('Sending login response:', { user: userData, tokenLength: token.length });
    res.json({
      user: userData,
      token,
    });
  } catch (error) {
    logger.error('Login error:', { 
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : 'Unknown error',
      body: req.body 
    });
    res.status(500).json({ message: 'Failed to login', details: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    // User will be attached by auth middleware
    const userId = (req as any).user.id;
    logger.debug('Getting profile for user:', { userId });

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      logger.warn('Profile not found:', { userId });
      return res.status(404).json({ message: 'User not found' });
    }

    logger.debug('Profile retrieved:', { user: user.toJSON() });
    res.json(user);
  } catch (error) {
    logger.error('Get profile error:', { error: error instanceof Error ? error.message : 'Unknown error' });
    res.status(500).json({ message: 'Failed to get profile' });
  }
}; 