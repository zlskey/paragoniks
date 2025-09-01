import type mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from 'src/config'

interface EncryptedToken {
  _id: mongoose.Types.ObjectId
}

export function createToken(_id: mongoose.Types.ObjectId, expiresIn: number) {
  return jwt.sign({ _id }, config.JWT_SECRET, { expiresIn })
}

export function validateToken(token: string): EncryptedToken | null {
  try {
    const EncryptedToken = jwt.verify(token, config.JWT_SECRET) as EncryptedToken

    return EncryptedToken
    /* eslint-disable unused-imports/no-unused-vars */
  }
  catch (err) {
    return null
  }
}
