import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../error/ApiError';
import { AccademicSemester } from '../accademicSemester/accademicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createNewStudent = async (student: IStudent, user: IUser) => {
  // defalut pass
  if (!user?.password) user.password = config.defaultStudentPass as string;

  //set role
  user.role = 'student';

  const accademicSemester = await AccademicSemester.findById(
    student.academicSemester
  );

  // transition role back
  let newUser = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(accademicSemester);
    user.id = id;
    student.id = id;

    const createdStudent = await Student.create([student], { session });
    if (!createdStudent.length) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Failed to create new student'
      );
    }

    user.student = createdStudent[0]._id;

    const createdUser = await User.create([user], { session });
    if (!createdUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create new user');
    }
    newUser = createdUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUser)
    newUser = await User.findOne({ id: newUser.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicFaculty' },
        { path: 'academicDepartment' },
      ],
    });

  return newUser;
};

const getAllUser = async () => {
  const user = await User.find({});
  if (!user) {
    throw new Error('Failed to find all user!');
  }
  return user;
};

const getUserByID = async (id: string) => {
  const user = await User.findOne({ id }).populate({
    path: 'student',
    populate: [
      { path: 'academicSemester', select: '-createdAt -updatedAt' }, // "-" for exclude
      { path: 'academicFaculty', select: 'title' }, // include
      { path: 'academicDepartment', select: 'title facultyID' }, // include
    ],
  });

  if (!user) {
    throw new Error('Failed to find all user!');
  }
  return user;
};

export const UserService = {
  createNewStudent,
  getAllUser,
  getUserByID,
};
