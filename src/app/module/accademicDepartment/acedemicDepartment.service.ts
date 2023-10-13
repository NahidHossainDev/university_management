import { claculatePagination } from '../../../helper/paginationHelper';
import {
  IPaginatedResponse,
  IPaginationOptions,
} from '../../../interfaces/pagination';
import {
  IAcademicDepartment,
  IAccademicDepartmentFilter,
} from './academicDepartment.interface';
import { AccademicDepartment } from './academicDepartment.model';

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = await AccademicDepartment.create(payload);
  if (result) {
    return result;
  } else {
    throw new Error('Failed to create Faculty!');
  }
};

const getAllDepartments = async (
  paginateQueries: IPaginationOptions,
  filters: IAccademicDepartmentFilter
): Promise<IPaginatedResponse<IAcademicDepartment[]>> => {
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

  const result = await AccademicDepartment.find(condition)
    .populate('facultyID')
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);

  const total = await AccademicDepartment.countDocuments();

  return {
    page,
    limit,
    total,
    data: result,
  };
};

const getDepartmentByID = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AccademicDepartment.findById(id);
  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
) => {
  const result = await AccademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AccademicDepartment.findOneAndDelete({ _id: id });
  return result;
};

export const AccademicDepartmentService = {
  createDepartment,
  getAllDepartments,
  getDepartmentByID,
  updateDepartment,
  deleteDepartment,
};
