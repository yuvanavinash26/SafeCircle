import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';
import { HTTP_STATUS } from '../utils/constants.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';
import { ApiResponse } from '../types/apiResponse.js';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err instanceof AppError ? err.statusCode : err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';

  if (statusCode >= 500) {
    logger.error(`[Error Handler] ${req.method} ${req.url} -> ${message}`, err);
  } else {
    logger.warn(`[Error Handler] ${req.method} ${req.url} -> ${statusCode}: ${message}`);
  }

  const response: ApiResponse = {
    success: false,
    message,
    error: env.NODE_ENV === 'development' ? err.stack || err : undefined,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
};
