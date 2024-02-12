import dotenv from 'dotenv'
import mongoose from 'mongoose'

/**
 * it inits db and env files
 */

dotenv.config()

const dbURI = process.env.MONGODB_URL
const dbRootUsername = process.env.MONGODB_ROOT_USERNAME
const dbRootPassword = process.env.MONGODB_ROOT_PASSWORD

if (!dbURI) throw Error('MONGODB_URL is not defined')

mongoose
  .connect(dbURI, {
    authSource: "admin",
    user: dbRootUsername,
    pass: dbRootPassword,
  })
  .then(() => console.info('db connected'))
  .catch(err => console.error(err))

export default {}
