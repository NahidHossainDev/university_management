import express from 'express';
import { AuthController } from './auth.controller';
const router = express.Router();

router.get('/login', AuthController.login);
router.get('/reset-password', AuthController.login);
router.get('/forgot-password', AuthController.login);
router.get('/change-password', AuthController.login);
router.get('/refresh-token', AuthController.login);

export const AuthRoutes = router;
