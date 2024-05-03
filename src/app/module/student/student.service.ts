import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import ApiError from '../../../error/ApiError';
import { claculatePagination } from '../../../helper/paginationHelper';
import {
  IPaginatedResponse,
  IPaginationOptions,
} from '../../../interfaces/pagination';
import { User } from '../user/user.model';
import { studentSearchableFields } from './student.constant';
import { IStudent, IStudentFilter } from './student.interface';
import { Student } from './student.model';

const getAllStudents = async (
  paginateQueries: IPaginationOptions,
  filters: IStudentFilter
): Promise<IPaginatedResponse<IStudent[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    claculatePagination(paginateQueries);
  const { searchTearm, ...remainingFilters } = filters;

  const andConditions = [];

  if (searchTearm) {
    andConditions.push({
      $or: studentSearchableFields.map(filed => ({
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

  const result = await Student.find(condition)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments();

  return {
    page,
    limit,
    total,
    data: result,
  };
};

const getStudentByID = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ id });
  return result;
};

const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  // check is code valid
  const isExist = await Student.findOne({ id });
  if (!isExist) throw new ApiError(StatusCodes.NOT_FOUND, 'Student not found!');

  const { name, guardian, localGuardian, ...studentData } = payload;

  const updatedStudentData: Partial<IStudent> = { ...studentData };

  // dynamicaly update name object
  if (name && Object.keys(name).length > 0) {
    for (const key in name) {
      (updatedStudentData as any)[`name.${key}`] =
        name[key as keyof typeof name];
    }
  }

  // dynamicaly update guardian object
  if (guardian && Object.keys(guardian).length > 0) {
    for (const key in guardian) {
      (updatedStudentData as any)[`guardian.${key}`] =
        guardian[key as keyof typeof guardian];
    }
  }

  // dynamicaly update localGuardian object
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    for (const key in localGuardian) {
      (updatedStudentData as any)[`localGuardian.${key}`] =
        localGuardian[key as keyof typeof localGuardian];
    }
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });
  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndDelete({ id }, { session });
    if (!deletedStudent) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'No stduent found');
    }

    const deletedUser = await User.findOneAndDelete({ id }, { session });
    if (!deletedUser) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'No user found');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const StudentService = {
  getAllStudents,
  getStudentByID,
  updateStudent,
  deleteStudent,
};
