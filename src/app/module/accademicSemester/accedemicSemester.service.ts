import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../error/ApiError';
import { claculatePagination } from '../../../helper/paginationHelper';
import {
  IPaginatedResponse,
  IPaginationOptions,
} from '../../../interfaces/pagination';
import { semesterTypeCodeMaper } from './accademicSemester.constant';
import {
  IAccademicSemeserFilter,
  IAccademicSemester,
} from './accademicSemester.interface';
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

const getAllSemesters = async (
  paginateQueries: IPaginationOptions,
  filters: IAccademicSemeserFilter
): Promise<IPaginatedResponse<IAccademicSemester[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    claculatePagination(paginateQueries);
  const { searchTearm, ...remainingFilters } = filters;
  const searchFields = ['title', 'code'];
  const andConditions = [];

  if (searchTearm) {
    andConditions.push({
      $or: searchFields.map(filed => ({
        [filed]: { $regex: searchTearm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(remainingFilters).length > 0) {
    andConditions.push({
      $and: Object.entries(remainingFilters).map(([filed, value]) => ({
        [filed]: value,
      })),
    });
  }

  const condition = andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AccademicSemester.find(condition)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);

  const total = await AccademicSemester.countDocuments();

  return {
    page,
    limit,
    total,
    data: result,
  };
};

const getSemesterByID = async (
  id: string
): Promise<IAccademicSemester | null> => {
  const result = await AccademicSemester.findById(id);
  return result;
};

const updateSemester = async (
  id: string,
  payload: Partial<IAccademicSemester>
) => {
  // check is code valid
  if (payload?.title) {
    if (semesterTypeCodeMaper[payload?.title] !== payload?.code)
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid semiester code!');
  }

  const result = await AccademicSemester.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return result;
};

export const AccademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSemesterByID,
  updateSemester,
};
