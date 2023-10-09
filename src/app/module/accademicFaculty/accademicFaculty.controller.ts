import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { parinateOptions } from '../../../constants/pagination';
import { IPaginatedResponse } from '../../../interfaces/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendFormatedResponse } from '../../../shared/sendFormatedResponse';
import { IAccademicFaculty } from './accademicFaculty.interface';
import { AccademicFacultyService } from './accedemicFaculty.service';

const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paylaod = req.body;
    const result = await AccademicFacultyService.createFaculty(paylaod);
    sendFormatedResponse<IAccademicFaculty>(res, {
      statusCode: StatusCodes.OK,
      result,
      message: 'Academic Semester created successfully!',
    });
  }
);

const getAllFacultys = catchAsync(async (req: Request, res: Response) => {
  const paginateQueries = pick(req?.query, parinateOptions);
  const filters = pick(req?.query, ['searchTearm']);
  const result = await AccademicFacultyService.getAllFacultys(
    paginateQueries,
    filters
  );
  sendFormatedResponse<IPaginatedResponse<IAccademicFaculty[]>>(res, {
    statusCode: StatusCodes.OK,
    result,
    message: '',
  });
});

const getFacultyByID = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AccademicFacultyService.getFacultyByID(id);

  sendFormatedResponse<IAccademicFaculty | null>(res, {
    statusCode: StatusCodes.OK,
    result,
    message: '',
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AccademicFacultyService.updateFaculty(id, payload);

  sendFormatedResponse<IAccademicFaculty | null>(res, {
    statusCode: StatusCodes.OK,
    result,
    message: '',
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AccademicFacultyService.deleteFaculty(id);

  sendFormatedResponse<IAccademicFaculty | null>(res, {
    statusCode: StatusCodes.OK,
    result,
    message: '',
  });
});

export const AccademicFacultyController = {
  createFaculty,
  getAllFacultys,
  getFacultyByID,
  updateFaculty,
  deleteFaculty,
};
