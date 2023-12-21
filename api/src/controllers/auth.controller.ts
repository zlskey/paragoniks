import {
  userValidationSchema,
  validateAndThrow,
} from 'src/utils/user-validation-schema'

import { RequestHandler } from 'express'
import _ from 'lodash'
import { getJwtFromHeader } from 'src/utils/get-jwt-from-header'
import { jwtUtils } from 'src/utils'
import { userService } from 'src/services'

const domain = process.env.MAIN_DOMAIN || 'localhost'

const maxAge = 1000 * 60 * 60 * 24 * 3

const cookieOptions = {
  maxAge,
  httpOnly: true,
  secure: true,
  domain,
}

export const signup: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body

  await validateAndThrow(userValidationSchema, username, password)

  const user = await userService.create(username, password)
  const token = jwtUtils.createToken(user._id, maxAge)

  res.cookie('jwt', token, cookieOptions).json({
    user: user.removePassword(),
    token,
  })
}

export const login: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body

  const user = await userService.getByUsername(username)

  await user.validatePassword(password)

  const token = jwtUtils.createToken(user._id, maxAge)

  res.cookie('jwt', token, cookieOptions).json({
    user: user.removePassword(),
    token,
  })
}

export const whoami: RequestHandler = async (req, res, next) => {
  const jwt = req.cookies.jwt || getJwtFromHeader(req.headers.authorization)

  const token = jwtUtils.validateToken(jwt)

  if (!token) {
    res.json(null)
    return
  }

  userService
    .getById(token._id)
    .then(user =>
      res.json({
        user: user.removePassword(),
        token: jwt,
      })
    )
    .catch(() => res.clearCookie('jwt', cookieOptions).json(null))
}

export const logout: RequestHandler = async (req, res, next) => {
  res.clearCookie('jwt', cookieOptions).status(200).json({})
}
