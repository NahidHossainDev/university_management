import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../error/ApiError';
import {
  createJWTAccessToken,
  createJWTRefreshToken,
  verifyJWTRefreshToken,
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

const refreshToken = async (token: string) => {
  let verifiedUser = null;
  try {
    verifiedUser = verifyJWTRefreshToken(token);
  } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid refresh token!');
  }

  const isUserExist = await User.isUserExist(verifiedUser?.id);
  if (!isUserExist)
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist!');

  // generate new token
  const { id, role } = isUserExist;
  const accessToken = createJWTAccessToken({ id, role });

  return {
    accessToken,
  };
};

export const AuthService = {
  login,
  refreshToken,
};
