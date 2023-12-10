import { ErrorObject } from './error.middleware'
import { IUser } from 'src/models/User.model'
import { RequestHandler } from 'express'
import constants from 'src/constants'
import { getJwtFromHeader } from 'src/utils/get-jwt-from-header'
import { jwtUtils } from 'src/utils'
import { userService } from 'src/services'

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

const authorizeCookie: RequestHandler = async (req, res, next) => {
  const jwt = req.cookies.jwt || getJwtFromHeader(req.headers.authorization)

  const token = jwtUtils.validateToken(jwt)

  if (!token) {
    return next(new ErrorObject(constants.invalid_auth, 401))
  }

  if (typeof token !== 'string') {
    const user = await userService.getById(token._id)

    if (!user) {
      return next(new ErrorObject(constants.invalid_auth, 401))
    }

    req.user = user
  }

  next()
}

export default authorizeCookie
