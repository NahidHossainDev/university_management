import { Router } from 'express';
import { AccademicDepartmentRouter } from '../module/accademicDepartment/academicDepartment.router';
import { AccademicFacultyRouter } from '../module/accademicFaculty/accademicFaculty.router';
import { AccademicSemesterRouter } from '../module/accademicSemester/accademicSemester.router';
import { AdminRoutes } from '../module/admin/admin.route';
import { AuthRoutes } from '../module/auth/auth.route';
import { FacultyRoutes } from '../module/faculty/faculty.route';
import { ManagementDepartmentRoutes } from '../module/managementDepartment/managementDepartment.router';
import { StudentRouter } from '../module/student/student.router';
import { UserRouter } from '../module/user/user.router';

const appRouter = Router();
const routeModule = [
  { path: '/user', route: UserRouter },
  { path: '/academic-semester', route: AccademicSemesterRouter },
  { path: '/academic-faculty', route: AccademicFacultyRouter },
  { path: '/academic-department', route: AccademicDepartmentRouter },
  { path: '/student', route: StudentRouter },
  { path: '/faculty', route: FacultyRoutes },
  { path: '/admin', route: AdminRoutes },
  { path: '/management-department', route: ManagementDepartmentRoutes },
  { path: '/auth', route: AuthRoutes },
];

routeModule.forEach(element => {
  appRouter.use(element.path, element.route);
});

export default appRouter;
