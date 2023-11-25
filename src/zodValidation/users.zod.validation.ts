import { z } from 'zod'
import UserModel from '../models/users.model'

const userZodSchema = z.object({
  userId: z
    .number()
    .int()
    .positive('User ID must be a positive integer')
    .refine(
      async (id: number) => {
        const existingId = await UserModel.findOne({ id })
        return !existingId
      },
      {
        message: 'User Id allready Exist',
      },
    ),
  username: z
    .string()
    .min(1, 'Username is required')
    .refine(async (userName: string) => {
      const existingUserName = await UserModel.findOne({ userName })
      return !existingUserName
    },
    {
      message: 'User Name allready Exist',
    },
    ),
  password: z.string().min(1, 'Password is required'),
  fullName: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
  }),
  age: z
    .number()
    .min(18, 'Age must be at least 18')
    .positive('Age must be a positive integer'),
  email: z.string().email('Invalid email format'),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  orders: z
  .array(
    z.object({
      productName: z.string().refine((value) => value.trim().length > 0, {
        message: "Product name is required",
      }),
      price: z.number().positive({
        message: "Price must be a positive number",
      }),
      quantity: z.number().int().positive({
        message: "Quantity must be a positive integer",
      }),
    })
  )
  .optional(),
})

export default userZodSchema
