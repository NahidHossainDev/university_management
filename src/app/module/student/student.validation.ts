import { z } from 'zod';

export const updateStudentZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    email: z.string().email().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.enum(['MALE', 'FEMALE']).optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    contactNo: z.string().optional(),
    permanentAddress: z.string().optional(),
    guardian: z
      .object({
        fatherName: z.string().optional(),
        fatherContactNo: z.string().optional(),
        motherName: z.string().optional(),
        motherContactNo: z.string().optional(),
      })
      .optional(),

    localGuardian: z
      .object({
        name: z.string().optional(),
        contactNo: z.string().optional(),
      })
      .optional(),
    profileImage: z.string().optional(),
    academicFaculty: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicSemester: z.string().optional(),
  }),
});

export const StudentValidation = { updateStudentZodSchema };
