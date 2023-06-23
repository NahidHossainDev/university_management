type ErrorMsg = {
  path: string
  message: string
}

export type IGenericErrorMsg = {
  success: boolean
  message: string
  errorMsg: ErrorMsg[]
  stack?: string | undefined
}

export type IGenericError = {
  statusCode: number
  message: string
  stack?: string
}
