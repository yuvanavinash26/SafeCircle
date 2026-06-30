import { Request, Response } from 'express';
import { HTTP_STATUS } from '../utils/constants.js';
import { ApiResponse } from '../types/apiResponse.js';

export const notFoundHandler = (req: Request, res: Response): void => {
  const response: ApiResponse = {
    success: false,
    message: `API Route Not Found: ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
  };

  res.status(HTTP_STATUS.NOT_FOUND).json(response);
};
