import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../error/ApiError';
import {
  createJWTAccessToken,
  createJWTRefreshToken,
} from '../../../helper/jwt.helper';
import { User } from '../user/user.model';
import { ILogingPayload, IloginUserResponse } from './auth.interface';

const login = async (paylaod: ILogingPayload): Promise<IloginUserResponse> => {
  const { id, password } = paylaod;

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist)
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist!');

  if (
    isUserExist?.password &&
    !(await User.isPasswordMatch(password, isUserExist.password))
  ) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Password does not match!');
  }

  // create access token
  const { id: userId, role, isPasswordChanged } = isUserExist;
  const accessToken = createJWTAccessToken({ id: userId, role });
  const refreshToken = createJWTRefreshToken({ id: userId, role });

  return {
    accessToken,
    refreshToken,
    isPasswordChanged,
  };
};
export const AuthService = {
  login,
};
