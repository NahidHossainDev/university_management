import config from '../../config'
import { IUser } from './user.interface'
import { User } from './user.module'
import { generateUserId } from './user.utils'

const createNewUser = async (data: IUser) => {
  // generate new user id
  const userID = await generateUserId()
  data.id = userID

  if (!data?.password) data.password = config.defaultStudentPass as string

  const user = await User.create(data)
  if (!user) {
    throw new Error('Failed to create new user!')
  }
  return user
}

const userService = {
  createNewUser,
}

export default userService
