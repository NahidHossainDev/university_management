import { Router } from 'express';
import { AccademicDepartmentRouter } from '../module/accademicDepartment/academicDepartment.router';
import { AccademicFacultyRouter } from '../module/accademicFaculty/accademicFaculty.router';
import { AccademicSemesterRouter } from '../module/accademicSemester/accademicSemester.router';
import { UserRouter } from '../module/user/user.router';

const appRouter = Router();
const routeModule = [
  { path: '/users', route: UserRouter },
  { path: '/semester', route: AccademicSemesterRouter },
  { path: '/faculty', route: AccademicFacultyRouter },
  { path: '/department', route: AccademicDepartmentRouter },
];

routeModule.forEach(element => {
  appRouter.use(element.path, element.route);
});

export default appRouter;
