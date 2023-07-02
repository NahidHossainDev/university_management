import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${date.getFullYear()}:${date.getMonth()}:${date.getDate()} AT ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

let loggerTransports = [];
let errorLoggerTransports = [];

if (process.env.NODE_ENV === 'production') {
  // Create file transport
  const fileTransport = new DailyRotateFile({
    filename: path.join(
      process.cwd(),
      'logs',
      'winston',
      'successes',
      '%DATE%.log'
    ),
    datePattern: 'DD-MM-YYYY-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  });

  loggerTransports = [fileTransport];
  errorLoggerTransports = [fileTransport];
} else {
  // Create console transport
  const consoleTransport = new transports.Console();

  loggerTransports = [consoleTransport];
  errorLoggerTransports = [consoleTransport];
}

// Create logger with transports based on environment
const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'Nahid' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: loggerTransports,
});

// Create error logger with transports based on environment
const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'Nahid' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: errorLoggerTransports,
});

function cleanupLogFiles() {
  const logDirs = [
    path.join(process.cwd(), 'logs', 'winston', 'successes'),
    path.join(process.cwd(), 'logs', 'winston', 'errors'),
  ];

  logDirs.forEach(dir => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.error('Error reading log files:', err);
        return;
      }

      files.forEach(file => {
        const filePath = path.join(dir, file);
        fs.unlink(filePath, err => {
          if (err) {
            console.error('Error deleting log file:', err);
          } else {
            console.log('Deleted log file:', filePath);
          }
        });
      });
    });
  });
}

// Schedule log file cleanup every hour in production environment
if (process.env.NODE_ENV === 'production') {
  setInterval(cleanupLogFiles, 60 * 60 * 1000);
}

export { errorLogger, logger };
