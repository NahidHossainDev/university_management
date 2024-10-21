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
  SUMMER: '01',
  AUTUMN: '02',
  FALL: '03',
};

export const EVENT_ACADEMIC_SEMESTER_CREATED = 'academic-semester.created';
export const EVENT_ACADEMIC_SEMESTER_UPDATED = 'academic-semester.updated';
export const EVENT_ACADEMIC_SEMESTER_DELETED = 'academic-semester.deleted';
