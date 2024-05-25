/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    isPasswordChanged: { type: Boolean, default: false, select: 0 },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre('save', async function (this) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
});

export const User = model<IUser, UserModel>('User', userSchema);
