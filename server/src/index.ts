import express, { Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './config/database';
import authRoutes from './routes/auth.routes';
import logger from './utils/logger';
import path from 'path';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

logger.info('CORS configuration:', corsOptions);
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware to log requests
app.use((req, res, next) => {
  logger.info(`Incoming ${req.method} request to ${req.path}`, {
    headers: req.headers,
    query: req.query,
    body: req.body,
    ip: req.ip,
  });
  next();
});

// API Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/health', (req: express.Request, res: express.Response) => {
  logger.info('Health check request received');
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static files from the React app
const clientBuildPath = path.join(__dirname, '../../../project/dist');
logger.info('Serving static files from:', clientBuildPath);

// Serve static files but exclude /api routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }
  express.static(clientBuildPath)(req, res, next);
});

// API 404 handler - for API routes that don't exist
app.all('/api/*', (req: express.Request, res: express.Response) => {
  logger.warn('API 404:', {
    path: req.path,
    method: req.method,
    headers: req.headers,
  });
  res.status(404).json({ message: `Cannot ${req.method} ${req.path}` });
});

// Serve index.html for all other routes (client-side routing)
app.get('*', (req: express.Request, res: express.Response) => {
  logger.info('Serving index.html for client-side route:', req.path);
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Error occurred:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  res.status(500).json({ message: 'Internal server error' });
});

// Initialize database and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Initialize database
    await initDatabase();

    // Start server
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`, {
        environment: process.env.NODE_ENV,
        port: PORT,
      });
      logger.info('Available routes:', {
        routes: [
          'POST /api/auth/register',
          'POST /api/auth/login',
          'GET /api/auth/profile',
          'GET /health',
          'GET * (client-side routes)',
        ],
      });
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 