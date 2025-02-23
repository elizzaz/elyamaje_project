import { Request, Response, NextFunction } from 'express';
import { AppError, errorHandler } from '../utils/errors';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[${new Date().toISOString()}] ${err.stack}`);
  
  const error = errorHandler(err);
  res.status(error.status).json(error);
};