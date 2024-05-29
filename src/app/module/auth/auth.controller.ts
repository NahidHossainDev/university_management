import { CookieOptions, Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import { catchAsync } from '../../../shared/catchAsync';
import { sendFormatedResponse } from '../../../shared/sendFormatedResponse';
import { IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

const login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken, ...rest } = await AuthService.login(req.body);
    const cookiesOptions: CookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookiesOptions);

    sendFormatedResponse(res, {
      statusCode: StatusCodes.OK,
      result: rest,
      message: 'User logged in successfully!',
    });
  }
);

const refreshToken: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await AuthService.refreshToken(refreshToken);

    const cookiesOptions: CookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookiesOptions);

    sendFormatedResponse<IRefreshTokenResponse>(res, {
      statusCode: StatusCodes.OK,
      result,
      message: 'User logged in successfully!',
    });
  }
);

const changePassword: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req;

    await AuthService.changePassword(user, req.body);

    sendFormatedResponse<IRefreshTokenResponse>(res, {
      statusCode: StatusCodes.OK,
      result: null,
      message: 'Password changed successfully!',
    });
  }
);

export const AuthController = {
  login,
  refreshToken,
  changePassword,
};
