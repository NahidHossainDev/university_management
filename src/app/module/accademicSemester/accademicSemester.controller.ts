import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { parinateOptions } from '../../../constants/pagination';
import { IPaginatedResponse } from '../../../interfaces/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendFormatedResponse } from '../../../shared/sendFormatedResponse';
import { IAccademicSemester } from './accademicSemester.interface';
import { AccademicSemesterService } from './accedemicSemester.service';

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paylaod = req.body;
    const result = await AccademicSemesterService.createSemester(paylaod);
    sendFormatedResponse<IAccademicSemester>(res, {
      statusCode: StatusCodes.OK,
      result,
      message: 'Academic Semester created successfully!',
    });
  }
);

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const paginateQueries = pick(req?.query, parinateOptions);
  const filters = pick(req?.query, ['searchTearm']);
  const result = await AccademicSemesterService.getAllSemesters(
    paginateQueries,
    filters
  );
  sendFormatedResponse<IPaginatedResponse<IAccademicSemester[]>>(res, {
    statusCode: StatusCodes.OK,
    result,
    message: '',
  });
});

const getSemesterByID = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AccademicSemesterService.getSemesterByID(id);

  sendFormatedResponse<IAccademicSemester | null>(res, {
    statusCode: StatusCodes.OK,
    result,
    message: '',
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await AccademicSemesterService.updateSemester(id, payload);

  sendFormatedResponse<IAccademicSemester | null>(res, {
    statusCode: StatusCodes.OK,
    result,
    message: '',
  });
});

export const AccademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSemesterByID,
  updateSemester,
};
