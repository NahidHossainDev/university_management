import { StatusCodes } from 'http-status-codes';
import mongoose, { startSession } from 'mongoose';
import config from '../../../config';
import ApiError from '../../../error/ApiError';
import { AccademicSemester } from '../accademicSemester/accademicSemester.model';
import { Admin } from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interface';
import { FacultyModel } from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';

const createNewStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // defalut pass
  if (!user?.password) user.password = config.default_student_pass as string;

  //set role
  user.role = 'student';

  const accademicSemester = await AccademicSemester.findById(
    student.academicSemester
  );

  if (!accademicSemester)
    throw new ApiError(StatusCodes.NOT_FOUND, 'Academic semester not found!');

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

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  if (!user?.password) user.password = config.default_faculty_pass as string;

  user.role = 'faculty';

  let newUser = null;
  const session = await startSession();

  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    const newFaculty = await FacultyModel.create(faculty, { session });
    if (!newFaculty.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Faculty');
    }

    user.faculty = newFaculty[0]._id;

    const createdUser = await User.create(user, { session });
    if (!createdUser.length)
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create Faculty');

    newUser = createdUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }

  if (newUser) {
    newUser = await User.findOne({ id: newUser.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUser;
};

const createAdmin = async (
  admin: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }
  // set role
  user.role = 'admin';

  // generate faculty id
  let newUser = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.admin = newAdmin[0]._id;

    const createdUser = await User.create([user], { session });

    if (!createdUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
    }
    newUser = createdUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUser) {
    newUser = await User.findOne({ id: newUser.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUser;
};

const getAllUser = async () => {
  const user = await User.find({});
  if (!user) {
    throw new Error('No user found!');
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
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');
  }
  return user;
};

export const UserService = {
  createNewStudent,
  createFaculty,
  createAdmin,
  getAllUser,
  getUserByID,
};
