import { Request, Response } from 'express'
import userService from './user.service'

const createUser = async (req: Request, res: Response) => {
  const userData = req.body
  try {
    const result = await userService.createNewUser(userData)
    res.status(200).json({
      success: true,
      data: result,
      message: '',
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      data: null,
      message: err,
    })
  }
}

const userController = {
  createUser,
}

export default userController
