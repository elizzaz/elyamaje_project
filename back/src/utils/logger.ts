/**
 * Application logger utility
 * Provides consistent logging format with timestamps and metadata
 */
export const logger = {
  /**
   * Logs informational messages
   * @param message - Main log message
   * @param meta - Optional metadata object
   */
  info: (message: string, meta?: object) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta || '');
  },

  /**
   * Logs error messages
   * @param message - Error description
   * @param error - Error object or details
   */
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '');
  },

  /**
   * Logs warning messages
   * @param message - Warning description
   * @param meta - Optional metadata object
   */
  warn: (message: string, meta?: object) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta || '');
  }
}; 