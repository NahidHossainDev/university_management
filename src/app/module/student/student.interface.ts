import { IAcademicDepartment } from '../accademicDepartment/academicDepartment.interface';
import { IAccademicFaculty } from '../accademicFaculty/accademicFaculty.interface';
import { IAcademicSemester } from './../accademicSemester/accademicSemester.interface';

// export type IStudent = InferSchemaType<typeof studentSchema>;
// export type IStudentModel = Model<IStudent, Record<string, string>>;

import { Model, Types } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type Guardian = {
  fatherName: string;
  fatherContactNo: string;
  motherName: string;
  motherContactNo: string;
  address: string;
};

export type LocalGuardian = {
  name: string;
  contactNo: string;
};

export type IStudent = {
  id: string;
  name: UserName;
  gender: 'MALE' | 'FEMALE';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContact: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  academicFaculty: Types.ObjectId | IAccademicFaculty;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicSemester: Types.ObjectId | IAcademicSemester;
  profileImage?: string;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;
