/**
 * Application logger utility
 * Provides consistent logging format with timestamps and metadata
 */
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Écrire tous les logs dans console.log
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // Écrire tous les logs d'erreur dans error.log
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    // Écrire tous les logs dans combined.log
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
})

// Si nous ne sommes pas en prod, ajoutons des logs plus détaillés
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }))
}

export default logger 