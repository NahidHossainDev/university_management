import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { createUserZodSchema } from './user.validation';

const router = express.Router();
router.post(
  '/create-user',
  validateRequest(createUserZodSchema),
  UserController.createUser
);

router.get('/get-users', UserController.getAllUser);

export { router as UserRouter };
