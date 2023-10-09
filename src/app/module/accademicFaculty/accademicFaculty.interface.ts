import { Model } from 'mongoose';

export type SemesterType = 'AUTUMN' | 'SUMMER' | 'FALL';
export type CodeType = '01' | '02' | '03';
export type Months =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAccademicFaculty = {
  title: SemesterType;
};

export type AccademicFacultyModel = Model<IAccademicFaculty>;

export type IAccademicFacultyFilter = {
  searchTearm?: string;
};
