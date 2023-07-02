import { RequestHandler } from 'express';
import { sendFormatedResponse } from '../../middlewares/responseFormater';
import { AccademicSemesterService } from './accedemicSemester.service';

const createSemester: RequestHandler = async (req, res, next) => {
  const paylaod = req.body;
  try {
    const result = await AccademicSemesterService.createSemester(paylaod);
    sendFormatedResponse(res, result);
  } catch (error) {
    next(error);
  }
};

export const AccademicSemesterController = { createSemester };
