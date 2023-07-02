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

export type IAccademicSemester = {
  title: SemesterType;
  year: number;
  code: CodeType;
  startMonth: Months;
  endMonth: Months;
};

export type AccademicSemesterModel = Model<IAccademicSemester>;
