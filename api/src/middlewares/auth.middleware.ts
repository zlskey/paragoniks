import type { RequestHandler } from 'express'
import type { IUserModel } from 'src/models/user.model'
import constants from 'src/constants'
import { userService } from 'src/services'
import { jwtUtils } from 'src/utils'
import { getJwtFromHeader } from 'src/utils/get-jwt-from-header'
import { ErrorObject } from './error.middleware'

declare global {
  namespace Express {
    interface Request {
      user?: IUserModel
    }
  }
}

export const authorizeCookie: RequestHandler = async (req, res, next) => {
  try {
    const jwt = req.cookies.jwt || getJwtFromHeader(req.headers.authorization)

    const token = jwtUtils.validateToken(jwt)

    if (!token) {
      throw new ErrorObject(constants.invalid_auth, 401)
    }

    if (typeof token !== 'string') {
      const user = await userService.getById(token._id)

      if (!user) {
        throw new ErrorObject(constants.invalid_auth, 401)
      }

      req.user = user
    }

    next()
  }
  catch (error) {
    console.error('Error in authorizeCookie middleware', error)
    next(error)
  }
}
