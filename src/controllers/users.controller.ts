import { Request, Response } from 'express'
import userZodSchema from '../zodValidation/users.zod.validation'
import { userService } from '../services/users.service'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'



const creatUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const zodParsedData = await userZodSchema.parseAsync(userData)
    const result = await userService.creatUser(zodParsedData)

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error as ZodError)
      res.status(500).json({
        success: false,
        message: 'Something went worng!',
        error: validationError,
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Something went worng!',
        error: (error as Error).message,
      })
    }
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers()
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went worng!',
      error: (error as Error).message,
    })
  }
}
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const result = await userService.getSingleUser(userId)
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went worng!',
      error: (error as Error).message,
    })
  }
}

const updateUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const userData = req.body
    const zodParsedData = await userZodSchema.parseAsync(userData)
    const result = await userService.updateUserData(userId, zodParsedData)

    const ResponsformattedUser = {
      userId: result?.userId,
      username: result?.username,
      fullName: result?.fullName,
      age: result?.age,
      email: result?.email,
      isActive: result?.isActive,
      hobbies: result?.hobbies,
      address: result?.address,
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: ResponsformattedUser,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went worng! from get single user',
      error: (error as Error).message,
    })
  }
}

const deleteUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const result = await userService.deleteUserData(userId)
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went worng! from deleteUserData',
      error: (error as Error).message,
    })
  }
}

const addProductsInUserDB = async (req: Request, res: Response) => {
  try {
    const Userid: string = req.params.userId
    const userAddProductData = req.body

    const result = await userService.addProductsInUserDB(
      Userid,
      userAddProductData,
    )

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found or update failed',
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went worng! from addProductsInUserDB',
      error: (error as Error).message,
    })
  }
}

const retrieveAllOrders = async (req: Request, res: Response) => {
  try {
    const Userid: string = req.params.userId
    const result = await userService.retrieveAllOrders(Userid)
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        oreders: result,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went worng! from retrieveAllOrders',
      error: (error as Error).message,
    })
  }
}

const calculateAllOrdersPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const result = await userService.calculateAllOrdersPrice(userId)

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went worng! from calculateAllOrdersPrice',
      error: (error as Error).message,
    })
  }
}

export const userContoler = {
  creatUser,
  getAllUsers,
  getSingleUser,
  updateUserData,
  deleteUserData,
  addProductsInUserDB,
  retrieveAllOrders,
  calculateAllOrdersPrice,
}
