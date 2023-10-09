import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AccademicFacultyController } from './accademicFaculty.controller';
import { createAccedemicFacultyZodScehma } from './accademicFaculty.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(createAccedemicFacultyZodScehma),
  AccademicFacultyController.createFaculty
);

router.get('/:id', AccademicFacultyController.getFacultyByID);

router.delete('/:id', AccademicFacultyController.deleteFaculty);

router.put('/update/:id', AccademicFacultyController.updateFaculty);

router.get('/', AccademicFacultyController.getAllFacultys);

export { router as AccademicFacultyRouter };
