/* eslint-disable no-unused-vars */
import { Model } from "mongoose"

interface TUserInterface {
  userId: number
  username: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: {
    street: string
    city: string
    country: string
  }
  orders?:
    | Array<{ productName: string; price: number; quantity: number }>
    | undefined
}


interface UserInterFaceModel extends Model<TUserInterface>{
  isUserExist(id:string): Promise<TUserInterface | null>
}



export { TUserInterface,UserInterFaceModel }
