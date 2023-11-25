import express, { Request, Response } from 'express'
import cors from 'cors'

import { userRoute } from './routes/users.route'
const app = express()

//parsers
app.use(express.json())
app.use(cors())

// application route
app.use('/api/users', userRoute)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello Nayem! Welcome to Mongoose-Express-TypeScript-CRUD-Guru')
})

export default app
