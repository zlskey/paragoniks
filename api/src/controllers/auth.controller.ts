import type { RequestHandler } from 'express'
import constants from 'src/constants'
import { ErrorObject } from 'src/middlewares/error.middleware'

import { userService } from 'src/services'
import { jwtUtils } from 'src/utils'
import { getJwtFromHeader } from 'src/utils/get-jwt-from-header'
import {
  userValidationSchema,
  validateAndThrow,
} from 'src/utils/user-validation-schema'

const domain = process.env.MAIN_DOMAIN || 'localhost'

const maxAge = 1000 * 60 * 60 * 24 * 3

const cookieOptions = {
  maxAge,
  httpOnly: true,
  secure: true,
  domain,
}

const emptyUserResponse = {
  user: null,
  token: null,
}

export const handleCheckIfUsernameIsTaken: RequestHandler = async (req, res) => {
  const { username } = req.query

  if (!username) {
    throw new ErrorObject(constants.missing_args)
  }

  const isTaken = await userService.checkIfUsernameIsTaken(username as string)

  res.status(200).json(isTaken)
}

export const signup: RequestHandler = async (req, res) => {
  const { username, password, avatarImage } = req.body

  await validateAndThrow(userValidationSchema, username, password)

  const user = await userService.create(username, password, avatarImage)
  const token = jwtUtils.createToken(user._id, maxAge)

  res.cookie('jwt', token, cookieOptions).json({
    user: user.removePassword(),
    token,
  })
}

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body

  const user = await userService.getByUsername(username)

  await user.validatePassword(password)

  const token = jwtUtils.createToken(user._id, maxAge)

  res.cookie('jwt', token, cookieOptions).json({
    user: user.removePassword(),
    token,
  })
}

export const whoami: RequestHandler = async (req, res) => {
  const jwt = req.cookies.jwt || getJwtFromHeader(req.headers.authorization)

  const token = jwtUtils.validateToken(jwt)

  if (!token) {
    res.json(emptyUserResponse)
    return
  }

  userService
    .getById(token._id)
    .then(user =>
      res.json({
        user: user.removePassword(),
        token: jwt,
      }),
    )
    .catch(() => res.clearCookie('jwt', cookieOptions).json(emptyUserResponse))
}

export const logout: RequestHandler = async (req, res) => {
  res.clearCookie('jwt', cookieOptions).status(200).json(emptyUserResponse)
}
