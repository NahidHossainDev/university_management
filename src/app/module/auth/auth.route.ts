import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { authGuard } from '../../middlewares/authGuard';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.logInValidation),
  AuthController.login
);
router.get(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidation),
  AuthController.refreshToken
);
router.post(
  '/change-password',
  authGuard([
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ]),
  validateRequest(AuthValidation.changePasswordValidation),
  AuthController.changePassword
);

router.post('/reset-password', AuthController.login);
router.post('/forgot-password', AuthController.login);

export const AuthRoutes = router;
