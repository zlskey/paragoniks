import dotenv from 'dotenv'
import mongoose from 'mongoose'
import config from 'src/config'

/**
 * init env files
 */

dotenv.config()

mongoose
  .connect(config.MONGODB_URL, {
    authSource: 'admin',
    user: config.MONGODB_ROOT_USERNAME,
    pass: config.MONGODB_ROOT_PASSWORD,
  })
  .then(() => console.info('db connected'))
  .catch(err => console.error(err))

export default {}
