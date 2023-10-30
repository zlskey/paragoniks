import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const JWT_SECRET = process.env.PORT

if (!JWT_SECRET) throw Error('JWT_SECRET is not defined')

interface EncryptedToken {
  _id: mongoose.Types.ObjectId
  username: string
}

export const createToken = (
  _id: mongoose.Types.ObjectId,
  username: string,
  expiresIn: number
) => jwt.sign({ _id, username }, JWT_SECRET, { expiresIn })

export const validateToken = (token: string): EncryptedToken | null => {
  try {
    const EncryptedToken = jwt.verify(token, JWT_SECRET) as EncryptedToken

    return EncryptedToken
  } catch (err) {
    return null
  }
}
