import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { sendFormatedResponse } from '../../../shared/sendFormatedResponse';
import { AccademicSemesterService } from './accedemicSemester.service';

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paylaod = req.body;
    const result = await AccademicSemesterService.createSemester(paylaod);
    sendFormatedResponse(res, {
      statusCode: StatusCodes.OK,
      result,
      message: 'Academic Semester created successfully!',
    });
  }
);

export const AccademicSemesterController = { createSemester };
