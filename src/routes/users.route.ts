import express from 'express'
import { userContoler } from '../controllers/users.controller';

const route = express.Router();


route.post('/create-user',userContoler.creatUser);
route.get('/all-users',userContoler.getAllUsers)

export const userRoute = route;