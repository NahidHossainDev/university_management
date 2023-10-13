import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { parinateOptions } from '../../../constants/pagination';
import { IPaginatedResponse } from '../../../interfaces/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendFormatedResponse } from '../../../shared/sendFormatedResponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AccademicDepartmentService } from './acedemicDepartment.service';

const createDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paylaod = req.body;
    const result = await AccademicDepartmentService.createDepartment(paylaod);
    sendFormatedResponse<IAcademicDepartment>(res, {
      statusCode: StatusCodes.OK,
      result,
      message: 'Academic Department created successfully!',
    });
  }
);

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const paginateQueries = pick(req?.query, parinateOptions);
  const filters = pick(req?.query, ['searchTearm']);
  const result = await AccademicDepartmentService.getAllDepartments(
    paginateQueries,
    filters
  );
  sendFormatedResponse<IPaginatedResponse<IAcademicDepartment[]>>(res, {
    statusCode: StatusCodes.OK,
    result,
    message: '',
  });
});

const getDepartmentByID = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AccademicDepartmentService.getDepartmentByID(id);

  sendFormatedResponse<IAcademicDepartment | null>(res, {
    statusCode: StatusCodes.OK,
    result,
    message: '',
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AccademicDepartmentService.updateDepartment(id, payload);

  sendFormatedResponse<IAcademicDepartment | null>(res, {
    statusCode: StatusCodes.OK,
    result,
    message: '',
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AccademicDepartmentService.deleteDepartment(id);

  sendFormatedResponse<IAcademicDepartment | null>(res, {
    statusCode: StatusCodes.OK,
    result,
    message: '',
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartments,
  getDepartmentByID,
  updateDepartment,
  deleteDepartment,
};
