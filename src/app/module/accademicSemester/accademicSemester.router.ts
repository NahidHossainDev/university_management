import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AccademicSemesterController } from './accademicSemester.controller';
import {
  createAccedemicSemesterZodScehma,
  updateAccademicSemesterZodScehma,
} from './accademicSemester.validation';

const router = express.Router();
router.get('/', AccademicSemesterController.getAllSemesters);

router.post(
  '/create-semester',
  validateRequest(createAccedemicSemesterZodScehma),
  AccademicSemesterController.createSemester
);

router.get('/:id', AccademicSemesterController.getSemesterByID);

router.delete('/:id', AccademicSemesterController.deleteSemester);

router.put(
  '/update/:id',
  validateRequest(updateAccademicSemesterZodScehma),
  AccademicSemesterController.updateSemester
);

export { router as AccademicSemesterRouter };
