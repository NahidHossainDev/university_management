import { ILogingPayload } from './auth.interface';

const login = async (paylaod: ILogingPayload) => {
  console.log(paylaod);
};

export const AuthService = {
  login,
};
