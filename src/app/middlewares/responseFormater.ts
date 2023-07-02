import { Response } from 'express';
export const sendFormatedResponse = (res: Response, result: unknown) => {
  res.status(200).json({
    success: true,
    data: result,
    message: null,
  });
};
