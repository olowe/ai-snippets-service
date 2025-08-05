import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export interface ApiError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  console.error('Error:', error);

  // Mongoose errors
  if (error instanceof mongoose.Error.ValidationError) {
    return res
      .status(400)
      .json({ error: 'Validation Error', message: error.message });
  }
  if (error instanceof mongoose.Error.CastError) {
    return res
      .status(400)
      .json({ error: 'Invalid ID', message: 'Invalid ID format' });
  }

  // Custom API errors
  if (error.statusCode) {
    return res
      .status(error.statusCode)
      .json({ error: 'API Error', message: error.message });
  }

  // Default error
  res.status(500).json({
    error: 'Internal Server Error',
    message:
      process.env.NODE_ENV === 'development'
        ? error.message
        : 'Something went wrong',
  });
};

export const createApiError = (
  message: string,
  statusCode: number,
): ApiError => {
  const error = new Error(message) as ApiError;
  error.statusCode = statusCode;
  return error;
};

export const asyncHandler =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
