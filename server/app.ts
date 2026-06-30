import express, { Application } from 'express';
import { corsOptions, helmetOptions, apiRateLimiter, swaggerSpec, swaggerUi } from './config/index.js';
import cors from 'cors';
import routes from './routes/index.js';
import { requestLogger, notFoundHandler, errorHandler } from './middlewares/index.js';

const createApp = (): Application => {
  const app = express();

  // Security & CORS Configuration
  app.use(helmetOptions);
  app.use(cors(corsOptions));

  // Rate limiting
  app.use('/api', apiRateLimiter);

  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // HTTP Request Logging
  app.use(requestLogger);

  // Swagger OpenAPI Documentation
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Mount API routes
  app.use('/api', routes);

  // Error Handling & 404
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

export const app = createApp();
