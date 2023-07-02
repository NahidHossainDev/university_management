import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { sendFormatedResponse } from '../../../shared/sendFormatedResponse';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await UserService.createNewUser(userData);
    sendFormatedResponse(res, {
      statusCode: StatusCodes.OK,
      result,
      message: 'User created successfully!',
    });
  }
);

const getAllUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.getAllUser();
    sendFormatedResponse(res, {
      statusCode: StatusCodes.OK,
      result,
    });
  }
);

export const UserController = {
  createUser,
  getAllUser,
};
