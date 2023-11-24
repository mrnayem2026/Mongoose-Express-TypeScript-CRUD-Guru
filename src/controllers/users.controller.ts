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
   if(error instanceof ZodError){
    const validationError = fromZodError(error as ZodError);
    res.status(500).json({
        success: false,
        message: 'Something went worng!',
        error: validationError,
    })
   } else {
    res.status(500).json({
        success: false,
        message: 'Something went worng!',
        error: error,
      })
   }
  }
}

const getAllUsers=async(req:Request,res:Response)=>{
  try {
    const result = await userService.getAllUsers()
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    })
  } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Something went worng!',
        error: error,
      })
   }
}

export const userContoler = {
  creatUser,
  getAllUsers
}
