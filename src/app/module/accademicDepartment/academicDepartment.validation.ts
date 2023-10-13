import { z } from 'zod';

export const createAcedemicDepartmentZodScehma = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required!' }),
    facultyID: z.string({ required_error: 'Faculty id is required' }),
  }),
});

export const updateAcedemicDepartmentZodScehma = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required!' }).optional(),
    facultyID: z
      .string({ required_error: 'Faculty id is required' })
      .optional(),
  }),
});

export const AccademicFacultyValidation = {
  createAcedemicDepartmentZodScehma,
  updateAcedemicDepartmentZodScehma,
};
