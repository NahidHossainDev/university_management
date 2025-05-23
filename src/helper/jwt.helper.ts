import jwt from 'jsonwebtoken';
import config from '../config';

export const createJWTAccessToken = (
  payload: Record<string, unknown>
): string => {
  return jwt.sign(payload, config.jwt.access_secret_key as string, {
    expiresIn: config.jwt.access_secret_expirity,
  });
};

export const createJWTRefreshToken = (
  payload: Record<string, unknown>
): string => {
  return jwt.sign(payload, config.jwt.refresh_secret as string, {
    expiresIn: config.jwt.refresh_secret_expirity,
  });
};

export const verifyJWTRefreshToken = (token: string): jwt.JwtPayload => {
  return jwt.verify(
    token,
    config.jwt.refresh_secret as string
  ) as jwt.JwtPayload;
};

export const verifyJWTAccessToken = (token: string): jwt.JwtPayload => {
  return jwt.verify(
    token,
    config.jwt.access_secret_key as string
  ) as jwt.JwtPayload;
};
