import { claculatePagination } from '../../../helper/paginationHelper';
import {
  IPaginatedResponse,
  IPaginationOptions,
} from '../../../interfaces/pagination';
import {
  IAccademicFaculty,
  IAccademicFacultyFilter,
} from './accademicFaculty.interface';
import { AccademicFaculty } from './accademicFaculty.model';

const createFaculty = async (
  payload: IAccademicFaculty
): Promise<IAccademicFaculty> => {
  const result = await AccademicFaculty.create(payload);
  if (result) {
    return result;
  } else {
    throw new Error('Failed to create Faculty!');
  }
};

const getAllFacultys = async (
  paginateQueries: IPaginationOptions,
  filters: IAccademicFacultyFilter
): Promise<IPaginatedResponse<IAccademicFaculty[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    claculatePagination(paginateQueries);
  const { searchTearm, ...remainingFilters } = filters;
  const searchFields = ['title'];
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

  const result = await AccademicFaculty.find(condition)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);

  const total = await AccademicFaculty.countDocuments();

  return {
    page,
    limit,
    total,
    data: result,
  };
};

const getFacultyByID = async (
  id: string
): Promise<IAccademicFaculty | null> => {
  const result = await AccademicFaculty.findById(id);
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IAccademicFaculty>
) => {
  const result = await AccademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (id: string): Promise<IAccademicFaculty | null> => {
  const result = await AccademicFaculty.findOneAndDelete({ _id: id });
  return result;
};

export const AccademicFacultyService = {
  createFaculty,
  getAllFacultys,
  getFacultyByID,
  updateFaculty,
  deleteFaculty,
};
