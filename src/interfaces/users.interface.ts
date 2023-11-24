import { Model } from 'mongoose'

export interface userInterface {
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
}

export interface userInterfaceModel extends Model<userInterface> {
  // eslint-disable-next-line no-unused-vars
  isUserExist(id: string): Promise<userInterface | null>
}
