import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import logger from '../utils/logger'
/**
 * Request Validation Middleware
 * Validates incoming request body against a Zod schema
 * For products, ensures prices are valid dollar amounts before conversion to cents
 * @param schema - Zod schema to validate against
 */
export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      logger.error('Validation error', { error, body: req.body });
      res.status(400).json({
        message: 'Validation failed',
        errors: (error as { errors: unknown }).errors
      });
    }
  };
};