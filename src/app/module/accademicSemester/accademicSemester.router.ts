import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AccademicSemesterController } from './accademicSemester.controller';
import { createAccedemicSemesterZodScehma } from './accademicSemester.validation';

const router = express.Router();
router.post(
  '/create-semester',
  validateRequest(createAccedemicSemesterZodScehma),
  AccademicSemesterController.createSemester
);

export { router as AccademicSemesterRouter };
