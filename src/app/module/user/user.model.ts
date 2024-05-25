/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, IUserMethods, IUserModel } from './user.interface';

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
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

// userSchema.methods.isUserExist = async function (
//   id: string
// ): Promise<Partial<IUser | null>> {
//   const isUserExist = await User.findOne(
//     { id },
//     { id: 1, isPasswordChanged: 1, password: 1 }
//   ).lean();

//   return isUserExist;
// };

// userSchema.methods.isPasswordMatch = async function isPasswordMatch(
//   textPass: string,
//   hashPass: string
// ) {
//   return bcrypt.compare(textPass, hashPass);
// };

userSchema.static(
  'isPasswordMatch',
  async function isPasswordMatch(textPass: string, hashPass: string) {
    return bcrypt.compare(textPass, hashPass);
  }
);

userSchema.static('isUserExist', async function (id: string): Promise<
  Partial<IUser | null>
> {
  const isUserExist = await User.findOne(
    { id },
    { id: 1, isPasswordChanged: 1, password: 1, role: 1 }
  ).lean();
  return isUserExist;
});

export const User = model<IUser, IUserModel>('User', userSchema);
