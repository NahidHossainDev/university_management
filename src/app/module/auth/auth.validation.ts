import { z } from 'zod';

const logInValidation = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required',
    }),
    password: z.string({
      required_error: 'Password is required',
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

const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({
      required_error: 'New password is required',
    }),
  }),
});

export const AuthValidation = {
  logInValidation,
  refreshTokenValidation,
  changePasswordValidation,
};
