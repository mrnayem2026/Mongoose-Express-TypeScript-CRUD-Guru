import express from 'express'
import { userContoler } from '../controllers/users.controller'

const route = express.Router()

route.post('/create-user', userContoler.creatUser)
route.get('/all-users', userContoler.getAllUsers)
route.get('/:userId', userContoler.getSingleUser)
route.put('/:userId',userContoler.updateUserData)
route.delete('/:userId',userContoler.deleteUserData)
route.put("/:userId/orders", userContoler.addProductsInUserDB); 
route.get("/:userId/orders", userContoler.retrieveAllOrders); 
route.get("/:userId/orders/total-price", userContoler.calculateAllOrdersPrice); 

export const userRoute = route