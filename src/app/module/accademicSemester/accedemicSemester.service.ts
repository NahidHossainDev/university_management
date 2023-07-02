import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../error/ApiError';
import { semesterTypeCodeMaper } from './accademicSemester.constant';
import { IAccademicSemester } from './accademicSemester.interface';
import { AccademicSemester } from './accademicSemester.model';

const createSemester = async (
  payload: IAccademicSemester
): Promise<IAccademicSemester> => {
  // check is code valid
  if (semesterTypeCodeMaper[payload.title] !== payload.code)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid semiester code!');
  const result = await AccademicSemester.create(payload);
  if (result) {
    return result;
  } else {
    throw new Error('Failed to create Semester!');
  }
};

export const AccademicSemesterService = { createSemester };
