/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import logger from './logger';
import logfy from './logfy';
import AppError from '@shared/errors/AppError';
import LoggedError from '@shared/errors/LoggedError';

interface LoggerConfig {
  showFields: string[];
}
export default function MethodLogger(config?: LoggerConfig) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    let className = target.constructor.name;
    const targetMethod = descriptor.value;
    if (className === 'Function') {
      className = target.name;
    }

    descriptor.value = async function (...args: any[]) {
      const baseString = `[${className}] - ${propertyKey}`;
      const showFields = config ? config.showFields : [];
      const logString = logfy(baseString, args, showFields);
      try {
        logger.info(logString);
        const data = await targetMethod.apply(this, args);
        return data;
      } catch (error) {
        if (error instanceof AppError || error instanceof LoggedError) {
          throw error;
        }
        logger.error(`${baseString} - Error: `, error);
        throw new LoggedError();
      }
    };
  };
}
