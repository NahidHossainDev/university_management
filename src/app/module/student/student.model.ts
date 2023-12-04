import { Schema, model } from 'mongoose';
import { IStudentModel } from './student.interface';

export const studentSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
      },
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    contactNo: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      required: true,
      type: {
        fatherName: {
          type: String,
          required: true,
        },
        fatherContactNo: {
          type: String,
          required: true,
        },
        motherName: {
          type: String,
          required: true,
        },
        motherContactNo: {
          type: String,
          required: true,
        },
      },
    },
    address: { type: String, required: true },
    localGuardian: {
      required: true,
      name: {
        type: String,
        required: true,
      },
      contactNo: {
        type: String,
        required: true,
      },
      profileImage: {
        type: String,
        required: true,
      },
      academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AccademicFaculty',
        required: true,
      },
      academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'AccademicDepartment',
        required: true,
      },
      academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AccademicSemester',
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Student = model<IStudentModel>('Student', studentSchema);
