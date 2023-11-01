import status from 'http-status-codes';
import { Schema, model } from 'mongoose';
import ApiError from '../../../error/ApiError';
import { codeType, months, semesterType } from './accademicSemester.constant';
import {
  AccademicSemesterModel,
  IAcademicSemester,
} from './accademicSemester.interface';

const accademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: semesterType,
    },
    code: {
      type: String,
      required: true,
      enum: codeType,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: months,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

accademicSemesterSchema.pre('save', async function (next) {
  const isExist = await AccademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic semester is already exist!');
  }
  next();
});

export const AccademicSemester = model<
  IAcademicSemester,
  AccademicSemesterModel
>('AccademicSemester', accademicSemesterSchema);
