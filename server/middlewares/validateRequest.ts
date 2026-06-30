import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { HTTP_STATUS } from '../utils/constants.js';
import { ApiResponse } from '../types/apiResponse.js';

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response: ApiResponse = {
      success: false,
      message: 'Validation error in request parameters or body',
      error: errors.array(),
      timestamp: new Date().toISOString(),
    };
    res.status(HTTP_STATUS.BAD_REQUEST).json(response);
    return;
  }
  next();
};
