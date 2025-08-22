import type mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET)
  throw new Error('JWT_SECRET is not defined')

interface EncryptedToken {
  _id: mongoose.Types.ObjectId
}

export function createToken(_id: mongoose.Types.ObjectId, expiresIn: number) {
  return jwt.sign({ _id }, JWT_SECRET, { expiresIn })
}

export function validateToken(token: string): EncryptedToken | null {
  try {
    const EncryptedToken = jwt.verify(token, JWT_SECRET) as EncryptedToken

    return EncryptedToken
    /* eslint-disable unused-imports/no-unused-vars */
  }
  catch (err) {
    return null
  }
}
