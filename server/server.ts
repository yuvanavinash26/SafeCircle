import { app } from './app.js';
import { connectDatabase } from './database/index.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

const startServer = async (): Promise<void> => {
  try {
    // 1. Connect to MongoDB
    await connectDatabase();

    // 2. Start Express HTTP Server
    const server = app.listen(env.PORT, () => {
      logger.info(`====================================================`);
      logger.info(`🚨 SafeCircle Backend Server Started Successfully`);
      logger.info(`🌍 Environment: ${env.NODE_ENV}`);
      logger.info(`🚀 Listening on Port: ${env.PORT}`);
      logger.info(`🔗 Base API URL: http://localhost:${env.PORT}/api`);
      logger.info(`📚 Swagger Docs: http://localhost:${env.PORT}/api/docs`);
      logger.info(`❤️  Health Check: http://localhost:${env.PORT}/api/health`);
      logger.info(`====================================================`);
    });

    // Handle unhandled rejections
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Rejection at:', promise);
      logger.error('Reason:', reason);
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception thrown:', error);
      process.exit(1);
    });
  } catch (error) {
    logger.error('Failed to initialize server:', error);
    process.exit(1);
  }
};

startServer();
