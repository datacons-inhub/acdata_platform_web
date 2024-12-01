// src/utils/logger.ts
import log from 'loglevel';

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