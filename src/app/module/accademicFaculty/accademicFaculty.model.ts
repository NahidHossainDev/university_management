import status from 'http-status-codes';
import { Schema, model } from 'mongoose';
import ApiError from '../../../error/ApiError';
import {
  AccademicFacultyModel,
  IAccademicFaculty,
} from './accademicFaculty.interface';

const accademicFacultySchema = new Schema<IAccademicFaculty>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

accademicFacultySchema.pre('save', async function (next) {
  const isExist = await AccademicFaculty.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic Faculty is already exist!');
  }
  next();
});

export const AccademicFaculty = model<IAccademicFaculty, AccademicFacultyModel>(
  'Accademic_Faculty',
  accademicFacultySchema
);
