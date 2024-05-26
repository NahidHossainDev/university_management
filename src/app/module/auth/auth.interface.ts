export type ILogingPayload = {
  id: string;
  password: string;
};

export type IloginUserResponse = {
  accessToken: string;
  refreshToken: string;
  isPasswordChanged: boolean;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
