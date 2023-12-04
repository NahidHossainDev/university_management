import { InferSchemaType, Model } from 'mongoose';
import { studentSchema } from './student.model';

export type IStudent = InferSchemaType<typeof studentSchema>;
export type IStudentModel = Model<IStudent, Record<string, string>>;
