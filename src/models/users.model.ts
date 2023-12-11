import { Schema, model } from 'mongoose'
import bycrpt from 'bcrypt'
import config from '../config'
import {
  TUserInterface,
  UserInterFaceModel,
} from '../interfaces/users.interface'

const userSchema = new Schema<TUserInterface, UserInterFaceModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User ID is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    validate: {
      validator: async (userName: string): Promise<boolean> => {
        const user = await UserModel.findOne({ userName })
        return !user
      },
    },
    message: 'Username already exists',
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [18, 'Age must be at least 18'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    default: [],
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
  },
  orders: [
    {
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
})

// pre save middleware / hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bycrpt.hash(user.password, Number(config.salt_round))
  next()
})

userSchema.methods.toJSON = function () {
  const userData = this.toObject()
  delete userData.password
  return userData
}

userSchema.statics.isUserExist = async function (userId: number) {
  const existUser = await UserModel.findOne({userId})
  return existUser
}

const UserModel = model<TUserInterface, UserInterFaceModel>('User', userSchema)

export default UserModel
