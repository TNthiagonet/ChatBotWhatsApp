const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

// Configuração do Logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    }),
    new DailyRotateFile({
      filename: 'application-%DATE%.log',
      dirname: 'logs',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

// Manter o console.log para falhas de transporte.
logger.on('error', (err) => {
  console.error('Logging error:', err);
});

// Exportar o logger
module.exports = { logger };
