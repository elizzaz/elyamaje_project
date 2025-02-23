/**
 * Custom application error class
 * Extends Error with additional properties for HTTP status code and error code
 */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Global error handler
 * Converts various error types to a standardized error response
 * @param error - Any caught error
 * @returns Standardized error object with status, message, and code
 */
export const errorHandler = (error: unknown) => {
  if (error instanceof AppError) {
    return {
      status: error.statusCode,
      message: error.message,
      code: error.code
    };
  }
  
  console.error('Unexpected error:', error);
  return {
    status: 500,
    message: 'Internal server error',
    code: 'INTERNAL_ERROR'
  };
}; 