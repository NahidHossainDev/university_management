import { Model, Types } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
  isPasswordChanged: boolean;
  student?: Types.ObjectId;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
};

// FOR USING INSTANSE METHODS
export type IUserMethods = {
  // isUserExist(id: string): Promise<Partial<IUser | null>>;
  // isPasswordMatch(textPass: string, hashPass: string): Promise<boolean>;
};

// export type IUserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type IUserModel = {
  isPasswordMatch(textPass: string, hashPass: string): Promise<boolean>;
  isUserExist(
    id: string
  ): Promise<Pick<
    IUser,
    'id' | 'role' | 'password' | 'isPasswordChanged'
  > | null>;
} & Model<IUser, Record<string, unknown>, IUserMethods>;
