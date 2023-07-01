type ErrorMsg = {
  path: string | number;
  message: string;
};

export type IGenericErrorMsg = {
  success: boolean;
  message: string;
  errorMsg: ErrorMsg[];
  stack?: string | undefined;
};

export type IGenericError = {
  statusCode: number;
  message: string;
  errorMsg: ErrorMsg[];
  stack?: string;
};
