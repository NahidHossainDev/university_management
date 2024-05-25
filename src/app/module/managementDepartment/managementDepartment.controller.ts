import { Request, Response } from 'express';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';

import { StatusCodes } from 'http-status-codes';
import { paginateOptions } from '../../../constants/pagination';
import { IPaginatedResponse } from '../../../interfaces/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendFormatedResponse } from '../../../shared/sendFormatedResponse';
import { IManagementDepartment } from './managementDepartment.interface';
import { ManagementDepartmentService } from './managementDepartment.service';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body;
  const result = await ManagementDepartmentService.createDepartment(
    departmentData
  );

  sendFormatedResponse<IManagementDepartment>(res, {
    statusCode: StatusCodes.OK,
    message: 'Management department created successfully',
    result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, managementDepartmentFilterableFields);
  const paginationQuery = pick(req.query, paginateOptions);

  const result = await ManagementDepartmentService.getAllDepartments(
    filters,
    paginationQuery
  );

  sendFormatedResponse<IPaginatedResponse<IManagementDepartment[]>>(res, {
    statusCode: StatusCodes.OK,
    message: 'Management departments retrieved successfully',
    result,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementDepartmentService.getSingleDepartment(id);

  sendFormatedResponse<IManagementDepartment>(res, {
    statusCode: StatusCodes.OK,
    message: 'Management department retieved successfully',
    result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await ManagementDepartmentService.updateDepartment(
    id,
    updatedData
  );

  sendFormatedResponse<IManagementDepartment>(res, {
    statusCode: StatusCodes.OK,
    message: 'Management department updated successfully',
    result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ManagementDepartmentService.deleteDepartment(id);

  sendFormatedResponse<IManagementDepartment>(res, {
    statusCode: StatusCodes.OK,
    message: 'Management department deleted successfully',
    result,
  });
});

export const ManagementDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
