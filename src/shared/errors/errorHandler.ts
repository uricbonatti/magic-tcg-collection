/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';
import AppError from './AppError';

export function findOnCelebrateErrorResponse(
  key: string,
  celebrateDefaultMessage: string
) {
  return {
    status: 'error',
    message: celebrateDefaultMessage.replace(/["]/g, "'")
  };
}

function errorHandler(
  err: any,
  __: Request,
  response: Response,
  _: NextFunction
) {
  if (isCelebrateError(err)) {
    const arrayErrorDetails: any[] = [];
    err.details.forEach((detail: any) => {
      const {
        details: [errorDetails]
      } = detail;
      arrayErrorDetails.push(errorDetails);
    });
    const error = arrayErrorDetails.shift();
    const responseContent = findOnCelebrateErrorResponse(
      error.context.key,
      error.message
    );
    return response.status(400).json(responseContent);
  }
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  });
}

export default errorHandler;
