import { Error } from 'mongoose'
import { IGenericErrorMsg } from '../interfaces/error'

export const handleMongooseValidationErr = (
  err: Error.ValidationError
): IGenericErrorMsg['errorMsg'] => {
  if (err?.errors) {
    return Object.values(err?.errors).map(el => ({
      path: el?.path,
      message: el?.message,
    }))
  }
  return []
}
