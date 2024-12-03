// src/utils/logger.ts
import log from 'loglevel';
//import winston from 'winston';

log.setLevel('info');
log.setLevel('debug');
log.setLevel('error');

const logger = {
  info: (message: string) => log.info(message),
  error: (message: string) => log.error(message),
  warn: (message: string) => log.warn(message),
  debug: (message: string) => log.debug(message),
};

export default logger;
/*
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

export default logger;*/