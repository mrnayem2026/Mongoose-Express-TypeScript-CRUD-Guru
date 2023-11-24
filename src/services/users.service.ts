import userInterface from '../interfaces/users.interface'
import UserModel from '../models/users.model'

// This below function work for create user and store data in mongodb.
const creatUser = async (userData: userInterface) => {
  const result = await UserModel.create(userData)
  return result
}

// This function creaet for get 'username fullName age email address' property from user collection.
const getAllUsers = async():Promise<userInterface[]> =>{
  const result = await UserModel.find({},'username fullName age email address');
  return result;
}



export const userService = {
  creatUser,
  getAllUsers
}
