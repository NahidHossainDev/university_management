import express from 'express';
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
router.post('/reset-password', AuthController.login);
router.post('/forgot-password', AuthController.login);
router.post('/change-password', AuthController.login);

export const AuthRoutes = router;
