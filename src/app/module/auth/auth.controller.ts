import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { sendFormatedResponse } from '../../../shared/sendFormatedResponse';
import { AuthService } from './auth.service';

const login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);

    sendFormatedResponse(res, {
      statusCode: StatusCodes.OK,
      result,
      message: 'User created successfully!',
    });
  }
);

export const AuthController = {
  login,
};
