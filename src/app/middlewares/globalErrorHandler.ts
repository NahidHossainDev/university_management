import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { handleMongooseValidationErr } from '../../error/handleMongoosValidationError'
import { IGenericErrorMsg } from '../../interfaces/error'

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  const result: IGenericErrorMsg = {
    success: false,
    message: 'Something Went Wrong!',
    errorMsg: [],
    stack: config.env !== 'production' ? error?.stack : undefined,
  }

  if (error?.name === 'ValidationError') {
    result.errorMsg = handleMongooseValidationErr(error)
  }
  if (config.env === 'production') {
    delete result.stack
  }

  res.status(error?.statusCode || 500).json(result)
  next()
}
