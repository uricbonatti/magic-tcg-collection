import { createLogger, transports, format } from 'winston';

import env from '@config/env';

const consoleTransport = new transports.Console({
  format: format.combine(
    format.simple(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, traceId, spanId, message }) => {
      const traceLog = traceId ? `[${traceId}]` : '';
      const spanLog = spanId ? `[${spanId}]` : '';
      return `[${timestamp}]${traceLog}${spanLog} ${level.toUpperCase()} ${message}`;
    })
  )
});

const setTransports: any[] = [];

setTransports.push(
  env.NODE_ENV === 'test'
    ? new transports.Console({ silent: true })
    : consoleTransport
);

const logger = createLogger({
  transports: setTransports
});

export default logger;
