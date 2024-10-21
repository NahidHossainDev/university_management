import { Model, Schema } from 'mongoose';

export type IAcademicDepartment = {
  title: string;
  facultyID: Schema.Types.ObjectId;
};

export type AccademicDepartmentModel = Model<IAcademicDepartment>;

export type IAccademicDepartmentFilter = {
  searchTearm?: string;
};

export type AcademicDepartmentCreatedEvent = {
  id: string;
  title: string;
  academicFacultyId: string;
};

export type AcademicDepartmentUpdatedEvent = {
  id: string;
  title: string;
  academicFacultyId: string;
};

export type AcademicDepartmentDeletedEvent = {
  id: string;
};
