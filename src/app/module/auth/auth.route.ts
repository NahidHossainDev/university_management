import express from 'express';
import { AuthController } from './auth.controller';
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/reset-password', AuthController.login);
router.post('/forgot-password', AuthController.login);
router.post('/change-password', AuthController.login);
router.post('/refresh-token', AuthController.login);

export const AuthRoutes = router;
