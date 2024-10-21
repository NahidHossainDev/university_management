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

export type IAcademicSemester = {
  title: SemesterType;
  year: string;
  code: CodeType;
  startMonth: Months;
  endMonth: Months;
};

export type AccademicSemesterModel = Model<IAcademicSemester>;

export type IAccademicSemeserFilter = {
  searchTearm?: string;
};

export type IAcademicSemesterCreatedEvent = {
  title: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  id: string;
};
