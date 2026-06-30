import swaggerUi from 'swagger-ui-express';
import { env } from './env.js';

export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'SafeCircle Women Safety Application API',
    version: '1.0.0',
    description: 'Backend REST API + Integration MVP for SafeCircle women safety application supporting Live Map, SOS, AI Voice Assistant, Fake Call, and Analytics.',
    contact: {
      name: 'SafeCircle Engineering Team',
    },
  },
  servers: [
    {
      url: `http://localhost:${env.PORT}/api`,
      description: 'Local Development Server',
    },
  ],
  paths: {
    '/health': {
      get: {
        summary: 'Health Check Endpoint',
        description: 'Returns server operational status and database connectivity',
        responses: {
          '200': {
            description: 'Server is healthy',
          },
        },
      },
    },
    '/users/profile': {
      get: {
        summary: 'Get current user profile',
        responses: {
          '200': { description: 'Profile fetched successfully' },
        },
      },
    },
    '/sos/trigger': {
      post: {
        summary: 'Trigger emergency SOS alert',
        responses: {
          '201': { description: 'SOS triggered and notifications dispatched' },
        },
      },
    },
  },
};

export { swaggerUi };
