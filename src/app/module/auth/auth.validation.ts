import { z } from 'zod';

const logInValidation = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required',
    }),
    passowrd: z.string({
      required_error: 'Passoword is required',
    }),
  }),
});

const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'ID is required',
    }),
  }),
});

export const AuthValidation = {
  logInValidation,
  refreshTokenValidation,
};
