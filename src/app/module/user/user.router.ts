import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { authGuard } from '../../middlewares/authGuard';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();
router.post(
  '/create-student',
  authGuard([
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
  ]),

  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);
router.post(
  '/create-faculty',
  authGuard([ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.FACULTY]),

  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculy
);
router.post(
  '/create-admin',
  authGuard([ENUM_USER_ROLE.SUPER_ADMIN]),
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);

router.get('/get-student', UserController.getAllUser);

router.get('/:id', UserController.getUserByID);

export { router as UserRouter };
