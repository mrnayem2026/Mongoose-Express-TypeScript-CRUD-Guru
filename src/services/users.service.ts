import userInterface from '../interfaces/users.interface'
import UserModel from '../models/users.model'

const creatUser = async (userData: userInterface) => {
  const result = await UserModel.create(userData)
  return result
}

export const userService = {
  creatUser,
}
