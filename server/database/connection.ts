import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';

export const connectDatabase = async (): Promise<void> => {
  try {
    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error occurred:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed due to app termination');
      process.exit(0);
    });

    await mongoose.connect(env.MONGODB_URI, {
      autoIndex: true,
    });
  } catch (error) {
    logger.error('Failed to connect to MongoDB on startup:', error);
    // Do not crash immediately if DB is unreachable during testing/development placeholder mode
    if (env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
