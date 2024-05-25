import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { sendFormatedResponse } from '../../../shared/sendFormatedResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createNewStudent(student, userData);
    sendFormatedResponse(res, {
      statusCode: StatusCodes.OK,
      result,
      message: 'User created successfully!',
    });
  }
);

const createFaculy: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await UserService.createFaculty(faculty, userData);

    sendFormatedResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      message: 'user created successfully!',
      result,
    });
  }
);

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createAdmin(admin, userData);

    sendFormatedResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      message: 'Admin created successfully!',
      result,
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

const getUserByID: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.getUserByID(id);
    sendFormatedResponse(res, {
      statusCode: StatusCodes.OK,
      result,
    });
  }
);

export const UserController = {
  createStudent,
  createAdmin,
  createFaculy,
  getAllUser,
  getUserByID,
};
