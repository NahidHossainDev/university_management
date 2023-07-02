import { Router } from 'express';
import { AccademicSemesterRouter } from '../module/accademicSemester/accademicSemester.router';
import { UserRouter } from '../module/user/user.router';

const appRouter = Router();
const routeModule = [
  { path: '/users', route: UserRouter },
  { path: '/semester', route: AccademicSemesterRouter },
];

routeModule.forEach(element => {
  appRouter.use(element.path, element.route);
});

export default appRouter;
