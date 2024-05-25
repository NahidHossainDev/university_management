import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendFormatedResponse } from '../../../shared/sendFormatedResponse';
import { paginateOptions } from './../../../constants/pagination';
import { facultyFilterableFields } from './faculty.constant';
import { FacultyService } from './faculty.service';

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const paginateQueries = pick(req?.query, paginateOptions);
  const filters = pick(req?.query, facultyFilterableFields);
  const result = await FacultyService.getAllFaculties(paginateQueries, filters);

  sendFormatedResponse(res, {
    result,
    statusCode: 200,
    message: 'Faculty data retrived successfully',
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.getSingleFaculty(id);

  sendFormatedResponse(res, {
    result,
    statusCode: 200,
    message: 'Faculty data retrived successfully',
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.updateFaculty(id, req.body);

  sendFormatedResponse(res, {
    result,
    statusCode: 200,
    message: 'Faculty data retrived successfully',
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.deleteFaculty(id);

  sendFormatedResponse(res, {
    result,
    statusCode: 200,
    message: 'Faculty data retrived successfully',
  });
});

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
