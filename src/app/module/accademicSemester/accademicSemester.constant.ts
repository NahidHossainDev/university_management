import { CodeType, SemesterType } from './accademicSemester.interface';

export const semesterType: string[] = ['AUTUMN', 'SUMMER', 'FALL'];

export const codeType: string[] = ['01', '02', '03'];

export const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const semesterTypeCodeMaper: Record<SemesterType, CodeType> = {
  AUTUMN: '01',
  SUMMER: '02',
  FALL: '03',
};
