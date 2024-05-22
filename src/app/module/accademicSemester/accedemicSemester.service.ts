import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../error/ApiError';
import { claculatePagination } from '../../../helper/paginationHelper';
import {
  IPaginatedResponse,
  IPaginationOptions,
} from '../../../interfaces/pagination';
import { semesterTypeCodeMaper } from './accademicSemester.constant';
import {
  IAcademicSemester,
  IAccademicSemeserFilter,
} from './accademicSemester.interface';
import { AccademicSemester } from './accademicSemester.model';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
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
): Promise<IPaginatedResponse<IAcademicSemester[]>> => {
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

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const condition = andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AccademicSemester.find(condition)
    .sort(sortConditions)
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
): Promise<IAcademicSemester | null> => {
  const result = await AccademicSemester.findById(id);
  return result;
};

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
) => {
  // check is code valid
  if (payload.title && semesterTypeCodeMaper[payload?.title] !== payload?.code)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid semiester code!');

  const result = await AccademicSemester.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return result;
};

const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AccademicSemester.findOneAndDelete({ _id: id });
  return result;
};

export const AccademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSemesterByID,
  updateSemester,
  deleteSemester,
};
