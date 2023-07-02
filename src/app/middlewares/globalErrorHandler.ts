/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../error/ApiError';
import { handleMongooseValidationErr } from '../../error/handleMongoosValidationError';
import { handleZodError } from '../../error/handleZodError';
import { IGenericErrorMsg } from '../../interfaces/error';
import { errorLogger } from '../../shared/logger';

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  config.env === 'development'
    ? console.log('Global error handler', error)
    : errorLogger.error('Global error handler', error);

  const result: IGenericErrorMsg = {
    success: false,
    message: 'Something Went Wrong!',
    errorMsg: [],
    stack: config.env !== 'production' ? error?.stack : undefined,
  };
  let statusCode: number = error?.statusCode || 500;

  if (error?.name === 'ValidationError') {
    result.errorMsg = handleMongooseValidationErr(error);
  } else if (error instanceof ZodError) {
    const { errorMsg, message, statusCode: code } = handleZodError(error);
    result.errorMsg = errorMsg;
    (result.message = message), (statusCode = code);
  } else if (error instanceof ApiError) {
    result.message = error?.message;
    result.errorMsg = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  } else if (error instanceof Error) {
    result.message = error?.message;
    result.errorMsg = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  }

  if (config.env === 'production') {
    delete result.stack;
  }

  res.status(statusCode).json(result);
  next();
};
