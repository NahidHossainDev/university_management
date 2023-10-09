import { z } from 'zod';

export const createAccedemicFacultyZodScehma = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required!' }),
  }),
});

export const AccademicFacultyValidation = {
  createAccedemicFacultyZodScehma,
};
