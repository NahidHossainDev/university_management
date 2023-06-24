import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  const userData = req.body
  try {
    const result = await UserService.createNewUser(userData)
    res.status(200).json({
      success: true,
      data: result,
      message: '',
    })
  } catch (err) {
    next(err)
  }
}

const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.getAllUser()
    res.status(200).json({
      success: true,
      data: result,
      message: '',
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createUser,
  getAllUser,
}
