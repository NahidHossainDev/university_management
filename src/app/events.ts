import { initAcademicDepartmentEvents } from './module/accademicDepartment/academicDepartment.events';
import { initAcademicFacultyEvents } from './module/accademicFaculty/accademicFaculty.events';
import { intiAcademicSemesterEvent } from './module/accademicSemester/accademicSemester.events';

export const subscribeRedisEvents = () => {
  initAcademicDepartmentEvents();
  initAcademicFacultyEvents();
  intiAcademicSemesterEvent();
};
