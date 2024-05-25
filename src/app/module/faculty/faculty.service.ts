import { StatusCodes } from 'http-status-codes';
import { startSession } from 'mongoose';
import ApiError from '../../../error/ApiError';
import { claculatePagination } from '../../../helper/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../user/user.model';
import { facultySearchableFields } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { FacultyModel } from './faculty.model';

const getAllFaculties = async (
  paginateQueries: IPaginationOptions,
  filters: IFacultyFilters
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    claculatePagination(paginateQueries);
  const { searchTerm, ...restFilter } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(filter => ({
        [filter]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(restFilter).length) {
    andConditions.push({
      $and: Object.entries(restFilter).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const conditions = andConditions.length > 0 ? { $and: andConditions } : {};

  const data = await FacultyModel.find(conditions)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .populate('academicDepartment')
    .populate('academicFaculty');

  const total = await FacultyModel.countDocuments(conditions);
  const totalPage = Math.ceil(total / limit);

  return {
    page,
    total,
    totalPage,
    data,
  };
};

const getSingleFaculty = async (id: string) => {
  const result = await FacultyModel.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};

const updateFaculty = async (id: string, payload: IFaculty) => {
  const isExist = await FacultyModel.findOne({ id });
  if (!isExist) throw new ApiError(StatusCodes.NOT_FOUND, 'Faculty not found');

  const { name, ...rest } = payload;
  const updatedData: Partial<IFaculty> = { ...rest };

  if (Object.keys(name).length) {
    Object.entries(name).forEach(([key, value]) => {
      (updatedData as any)[`name.${key}`] = value;
    });
  }

  const data = await FacultyModel.updateOne({ id }, updatedData, {
    new: true,
  });

  return data;
};

const deleteFaculty = async (id: string) => {
  const isExist = await FacultyModel.findOne({ id });
  if (!isExist) throw new ApiError(StatusCodes.NOT_FOUND, 'Faculty not found');

  const session = await startSession();
  try {
    session.startTransaction();
    const deletedFaculty = await FacultyModel.findOneAndDelete(
      { id },
      { session }
    );
    if (!deletedFaculty)
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to delete faculty'
      );

    const deletedUser = await User.deleteOne({ id });
    if (!deletedUser)
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to delete faculty'
      );

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
