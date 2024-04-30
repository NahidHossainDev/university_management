import { z } from 'zod';

export const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required!',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last name is required!',
        }),
      }),
      email: z.string({ required_error: 'Email is required!' }).email(),
      dateOfBirth: z.string({ required_error: 'Date of birth is required!' }),
      gender: z.enum(['MALE', 'FEMALE'], {
        required_error: 'Gender is required!',
      }),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      contactNo: z.string({ required_error: 'Contact number is required!' }),
      permanentAddress: z.string({
        required_error: 'Parmanent address is required!',
      }),
      guardian: z.object({
        fatherName: z.string({ required_error: 'Father name is required!' }),
        fatherContactNo: z.string({
          required_error: 'Father contact number is required!',
        }),
        motherName: z.string({ required_error: 'Mother name is required!' }),
        motherContactNo: z.string({
          required_error: 'Mother contact number is required!',
        }),
      }),

      localGuardian: z.object({
        name: z.string({ required_error: 'Name is required!' }),
        contactNo: z.string({ required_error: 'Contact number is required!' }),
      }),
      profileImage: z.string().optional(),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required!',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required!',
      }),
      academicSemester: z.string({
        required_error: 'Academic semester is required!',
      }),
    }),
  }),
});

export const UserValidation = { createUserZodSchema };
