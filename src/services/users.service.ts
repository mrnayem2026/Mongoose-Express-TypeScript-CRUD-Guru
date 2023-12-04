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
  userID: string,
): Promise<TUserInterface | null> => {
  const result = await UserModel.findById(
    userID,
    'userId username fullName age email isActive hobbies address',
  )
  return result
}

// this below function update user data
const updateUserData = async (
  userId: string,
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

    const result = await UserModel.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    })
    return result
  } catch (error) {
    throw error
  }
}

const deleteUserData = async (userId: string) => {
  const deletedData = await UserModel.findByIdAndDelete(userId)
  return deletedData
}

// Add product in Oredes array
const addProductsInUserDB = async (
  Userid: string,
  productData: Partial<TUserInterface>,
) => {
  const UserExist = await UserModel.findById(Userid)

  if (!UserExist) {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { productName, price, quantity }: any = productData
  const newOrder = { productName, price, quantity }

  if (!UserExist.orders) {
    UserExist.orders = []
  }

  UserExist.orders.push(newOrder)

  const UpdataUserExistData = await UserExist.save()
  return UpdataUserExistData
}

// Get all orders for a specific user
const retrieveAllOrders = async (userId: string) => {
  const userExistOrders = await UserModel.findById(userId)
  return userExistOrders?.orders || null
}

// Get All order price for a specific user
const calculateAllOrdersPrice = async (userId: string) => {
  const userExistOrders = await UserModel.findById(userId)
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
