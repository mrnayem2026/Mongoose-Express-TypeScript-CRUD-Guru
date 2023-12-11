/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import {
  createUserZodSchema,
  updateUserZodSchema,
} from '../zodValidation/users.zod.validation'
import { userService } from '../services/users.service'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { TUserInterface } from '../interfaces/users.interface'
import UserModel from '../models/users.model'

const creatUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body

    const zodParsedData = await createUserZodSchema.parseAsync(userData)

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
    const { userId } = req.params
    if (!(await UserModel.isUserExist(Number(userId)))) {
      return res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
    const result = await userService.getSingleUser(Number(userId))

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    })
  }
}

const updateUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const userData = req.body

    if (!(await UserModel.isUserExist(Number(userId)))) {
      return res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }

    const zodParsedData = (await updateUserZodSchema.parseAsync(
      userData,
    )) as TUserInterface
    const result = await userService.updateUserData(
      Number(userId),
      zodParsedData,
    )

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
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    })
  }
}

const deleteUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    
    if (!(await UserModel.isUserExist(Number(userId)))) {
      return res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const result = await userService.deleteUserData(Number(userId))
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    })
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    })
  }
}

const addProductsInUserDB = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    const userDataToUpdate = req.body;

    if (!(await UserModel.isUserExist(Number(userId)))) {
      return res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found! 1',
        },
      })
    }

    const result = await userService.addProductsInUserDB(
      userId,
      userDataToUpdate
    );

    if (result) {
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found! 1',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    })
  }
};



const retrieveAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    
    if (!(await UserModel.isUserExist(Number(userId)))) {
      return res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }

    const result = await userService.retrieveAllOrders(Number(userId))
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
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found! 2',
      },
    })
  }
}

const calculateAllOrdersPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    
    if (!(await UserModel.isUserExist(Number(userId)))) {
      return res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }
    const result = await userService.calculateAllOrdersPrice(Number(userId))

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
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
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
