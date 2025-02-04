// src/services/logger.ts

function formatMessage(level: string, msg: unknown): string {
  const text = typeof msg === 'object' ? JSON.stringify(msg) : String(msg);
  return `[${level}]: ${text}`;
}

const logger = {
  info: (msg: unknown) => console.info(formatMessage('INFO', msg)),
  error: (msg: unknown) => console.error(formatMessage('ERROR', msg)),
  warn: (msg: unknown) => console.error(formatMessage('WARN', msg)),
};

export default logger;
