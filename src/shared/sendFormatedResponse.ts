import { Response } from 'express';

export type IApiResponse<T> = {
  statusCode: number;
  result: T | null;
  message?: string | null;
};

export const sendFormatedResponse = <T>(
  res: Response,
  data: IApiResponse<T>
) => {
  const { statusCode, message, result } = data;
  res.status(statusCode).json({
    success: true,
    data: result ?? null,
    message: message || null,
  });
};
