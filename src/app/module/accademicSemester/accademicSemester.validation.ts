import { z } from 'zod';
import { codeType, months, semesterType } from './accademicSemester.constant';

export const createAccedemicSemesterZodScehma = z.object({
  body: z.object({
    title: z.enum(semesterType as [string, ...string[]], {
      required_error: 'Title is required!',
    }),
    code: z.enum(codeType as [string, ...string[]], {
      required_error: 'Code is required!',
    }),
    year: z.number({
      required_error: 'Year is required!',
    }),
    startMonth: z.enum(months as [string, ...string[]], {
      required_error: 'Start month is required!',
    }),
    endMonth: z.enum(months as [string, ...string[]], {
      required_error: 'End month is required!',
    }),
  }),
});

export const updateAccademicSemesterZodScehma = z
  .object({
    body: z.object({
      title: z.enum(semesterType as [string, ...string[]]).optional(),
      code: z.enum(codeType as [string, ...string[]]).optional(),
      year: z.number().optional(),
      startMonth: z.enum(months as [string, ...string[]]).optional(),
      endMonth: z.enum(months as [string, ...string[]]).optional(),
    }),
  })
  .refine(data => data?.body?.title && data?.body?.code, {
    message: `Either 'title' and 'code' both or neither`,
  });

export const AccademicSemesterValidation = {
  createAccedemicSemesterZodScehma,
  updateAccademicSemesterZodScehma,
};
