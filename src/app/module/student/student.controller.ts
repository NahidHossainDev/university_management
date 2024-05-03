import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { parinateOptions } from '../../../constants/pagination';
import { IPaginatedResponse } from '../../../interfaces/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendFormatedResponse } from '../../../shared/sendFormatedResponse';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const paginateQueries = pick(req?.query, parinateOptions);
  const filters = pick(req?.query, ['searchTearm']);
  const result = await StudentService.getAllStudents(paginateQueries, filters);
  sendFormatedResponse<IPaginatedResponse<IStudent[]>>(res, {
    statusCode: StatusCodes.OK,
    result,
    message: '',
  });
});

const getStudentByID = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.getStudentByID(id);

  sendFormatedResponse<IStudent | null>(res, {
    statusCode: StatusCodes.OK,
    result,
    message: '',
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await StudentService.updateStudent(id, payload);

  sendFormatedResponse<IStudent | null>(res, {
    statusCode: StatusCodes.OK,
    result,
    message: '',
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.deleteStudent(id);

  sendFormatedResponse<IStudent | null>(res, {
    statusCode: StatusCodes.OK,
    result,
    message: '',
  });
});

export const StudentController = {
  getAllStudent,
  getStudentByID,
  updateStudent,
  deleteStudent,
};
