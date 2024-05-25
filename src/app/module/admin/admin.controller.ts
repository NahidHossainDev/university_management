import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginateOptions } from '../../../constants/pagination';
import { IPaginatedResponse } from '../../../interfaces/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendFormatedResponse } from '../../../shared/sendFormatedResponse';
import { adminFilterableFields } from './admin.constant';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.service';

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginateOptions);

  const result = await AdminService.getAllAdmins(filters, paginationOptions);

  sendFormatedResponse<IPaginatedResponse<IAdmin[]>>(res, {
    statusCode: StatusCodes.OK,
    message: 'Admins retrieved successfully !',
    result,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.getSingleAdmin(id);

  sendFormatedResponse<IAdmin>(res, {
    statusCode: StatusCodes.OK,
    message: 'Admin retrieved successfully !',
    result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AdminService.updateAdmin(id, updatedData);

  sendFormatedResponse<IAdmin>(res, {
    statusCode: StatusCodes.OK,
    message: 'Admin updated successfully !',
    result,
  });
});
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AdminService.deleteAdmin(id);

  sendFormatedResponse<IAdmin>(res, {
    statusCode: StatusCodes.OK,
    message: 'Admin deleted successfully !',
    result,
  });
});

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
