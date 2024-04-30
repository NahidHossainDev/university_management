import status from 'http-status-codes';
import { Schema, model } from 'mongoose';
import ApiError from '../../../error/ApiError';
import {
  AccademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interface';

const accademicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    facultyID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AccademicFaculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

accademicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AccademicDepartment.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      status.CONFLICT,
      'Academic Department is already exist!'
    );
  }
  next();
});

export const AccademicDepartment = model<
  IAcademicDepartment,
  AccademicDepartmentModel
>('Accademic_Department', accademicDepartmentSchema);
