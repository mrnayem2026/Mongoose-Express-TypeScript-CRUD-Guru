import { userInterface } from '../interfaces/users.interface'
import UserModel from '../models/users.model'

// This below function work for create user and store data in mongodb.
const creatUser = async (userData: userInterface) => {
  const result = await UserModel.create(userData)
  return result
}

// This function creaet for get 'username fullName age email address' property from user collection.
const getAllUsers = async (): Promise<userInterface[]> => {
  const result = await UserModel.find({}, 'username fullName age email address')
  return result
}

// TODO: If you can't find information about the user, show a clear message. Use either instance or static method to determine if the user exist or not.
// This function return single user
const getSingleUser = async (userID: string): Promise<userInterface | null> => {
  const result = await UserModel.findById(userID)
  return result
}

// this below function update user data

const updateUserData = async (
  userId: string,
  userData: userInterface,
): Promise<userInterface | null> => {
  const result = await UserModel.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  })

  return result
}

export const userService = {
  creatUser,
  getAllUsers,
  getSingleUser,
  updateUserData,
}
