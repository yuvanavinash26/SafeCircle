import { Response } from 'express';
import { HTTP_STATUS } from './constants.js';
import { ApiResponse } from '../types/apiResponse.js';

export class ResponseHelper {
  public static success<T>(
    res: Response,
    data: T,
    message: string = 'Success',
    statusCode: number = HTTP_STATUS.OK
  ): Response<ApiResponse<T>> {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(response);
  }

  public static error(
    res: Response,
    message: string = 'Internal Server Error',
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errorDetails?: any
  ): Response<ApiResponse> {
    const response: ApiResponse = {
      success: false,
      message,
      error: errorDetails,
      timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(response);
  }
}
