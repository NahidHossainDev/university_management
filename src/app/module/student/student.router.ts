import express from 'express';

import { validateRequest } from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { updateStudentZodSchema } from './student.validation';

const router = express.Router();
router.get('/', StudentController.getAllStudent);

router.get('/:id', StudentController.getStudentByID);

router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/update/:id',
  validateRequest(updateStudentZodSchema),
  StudentController.updateStudent
);

export { router as StudentRouter };
