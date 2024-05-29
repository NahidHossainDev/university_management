import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../error/ApiError';
import { verifyJWTAccessToken } from '../../helper/jwt.helper';

export const authGuard =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const token = String(authorization).split(' ')[1];

      if (!token)
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized access!');

      const verifyedUser = verifyJWTAccessToken(token);

      if (!verifyedUser)
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token!');

      if (!roles.includes(verifyedUser?.role))
        throw new ApiError(StatusCodes.FORBIDDEN, 'Forbidden Resource!');

      req.user = verifyedUser;

      next();
    } catch (error) {
      next(error);
    }
  };
