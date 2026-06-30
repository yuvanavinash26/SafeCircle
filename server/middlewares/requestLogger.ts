import morgan from 'morgan';
import { logger } from '../utils/logger.js';

// Custom morgan stream redirecting logs to our custom logger
const stream: morgan.StreamOptions = {
  write: (message: string) => {
    logger.info(`[HTTP] ${message.trim()}`);
  },
};

export const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms', { stream });
