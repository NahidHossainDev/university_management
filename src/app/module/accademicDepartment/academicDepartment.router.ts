import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { createAcedemicDepartmentZodScehma } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(createAcedemicDepartmentZodScehma),
  AcademicDepartmentController.createDepartment
);

router.get('/:id', AcademicDepartmentController.getDepartmentByID);

router.delete('/:id', AcademicDepartmentController.deleteDepartment);

router.put(
  '/update/:id',
  validateRequest(createAcedemicDepartmentZodScehma),
  AcademicDepartmentController.updateDepartment
);

router.get('/', AcademicDepartmentController.getAllDepartments);

export { router as AccademicDepartmentRouter };
