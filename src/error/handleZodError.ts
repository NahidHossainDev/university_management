import { ZodError } from 'zod';
import { IGenericError } from '../interfaces/error';

export const handleZodError = (error: ZodError): IGenericError => {
  const errorMsg = error?.issues?.map(err => ({
    path: err?.path[err.path.length - 1],
    message: err.message.toString(),
  }));

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMsg,
  };
};
