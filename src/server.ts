import mongoose from 'mongoose'

import app from './app'
import config from './config'

const server = async () => {
  try {
    await mongoose.connect(config.database_url as string)

    app.listen(config.port, () => {
      console.log(
        `Mongoose-Express-TypeScript-CRUD-Guru app listening on port ${config.port}`,
      )
    })
  } catch (error) {
    console.log(error)
  }
}

server()
