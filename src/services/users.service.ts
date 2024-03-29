/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import config from '../config'
import { TUserInterface } from '../interfaces/users.interface'
import UserModel from '../models/users.model'
import bycrpt from 'bcrypt'

// This below function work for create user and store data in mongodb.
const creatUser = async (userData: TUserInterface) => {
  const result = await UserModel.create(userData)
  return result
}

// This function creaet for get 'username fullName age email address' property from user collection.
const getAllUsers = async (): Promise<TUserInterface[]> => {
  const result = await UserModel.find({}, 'username fullName age email address')
  return result
}

// This function return single user
const getSingleUser = async (
  userId: number,
): Promise<TUserInterface | null> => {
  const result = await UserModel.findOne(
    { userId },
    'userId username fullName age email isActive hobbies address',
  )
  return result
}

// this below function update user data
const updateUserData = async (
  userId: number,
  userData: TUserInterface,
): Promise<TUserInterface | null> => {
  try {
    const { password } = userData

    if (password) {
      userData.password = await bycrpt.hash(
        userData.password,
        Number(config.salt_round),
      )
    }

    const result = await UserModel.findOneAndUpdate({ userId }, userData, {
      new: true,
      runValidators: true,
    })
    return result
  } catch (error) {
    throw error
  }
}

const deleteUserData = async (userId: number) => {
  const deletedData = await UserModel.findOneAndDelete({ userId })
  return deletedData
}

// Add product in Oredes array
const addProductsInUserDB = async (
  userId: number,
  updatedUserData: Partial<TUserInterface>
) => {
  const user = await UserModel.findOne({ userId });

  if (!user) {
    return null;
  }

  const { productName, price, quantity }: any = updatedUserData;
  const newOrder = { productName, price, quantity };

  if (!user.orders) {
    user.orders = [];
  }

  user.orders.push(newOrder);
  const updatedUser = await user.save();

  return updatedUser;
};

// Get all orders for a specific user
const retrieveAllOrders = async (userId: number) => {
  const userExistOrders = await UserModel.findOne({ userId })
  return userExistOrders?.orders || null
}

// Get All order price for a specific user
const calculateAllOrdersPrice = async (userId: number) => {
  const userExistOrders = await UserModel.findOne({ userId })
  const ordersOfUser = userExistOrders?.orders || []

  let totalPrice = 0

  ordersOfUser.forEach((order) => {
    const allTotalPric = order.price * order.quantity
    totalPrice += allTotalPric
  })
  return totalPrice
}

export const userService = {
  creatUser,
  getAllUsers,
  getSingleUser,
  updateUserData,
  deleteUserData,
  addProductsInUserDB,
  retrieveAllOrders,
  calculateAllOrdersPrice,
}
