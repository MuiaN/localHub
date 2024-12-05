import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Configure logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'error' : 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Write errors to console
    new winston.transports.Console({
      level: 'error',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // Write all logs to `logs/combined.log`
    new winston.transports.File({ 
      filename: path.join(logsDir, 'combined.log'),
      level: 'error'
    }),
    // Write all errors to `logs/error.log`
    new winston.transports.File({ 
      filename: path.join(logsDir, 'error.log'),
      level: 'error'
    }),
  ],
});

export default logger; 