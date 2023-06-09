import { User } from './user.module'

export const getLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = (await getLastUserId()) || String(0)
  return String(Number(currentId) + 1).padStart(5, '0')
}
