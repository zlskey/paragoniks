import {
  userValidationSchema,
  validateAndThrow,
} from 'src/utils/user-validation-schema'

import { RequestHandler } from 'express'
import _ from 'lodash'
import { jwtUtils } from 'src/utils'
import { userService } from 'src/services'

const getMaxAge = remember => {
  const oneDay = 1000 * 60 * 60 * 24

  return remember ? oneDay * 365 : oneDay * 3
}

const domain = process.env.MAIN_DOMAIN || 'localhost'

const getCookieOptions = remember => ({
  maxAge: getMaxAge(remember),
  httpOnly: true,
  secure: true,
  domain,
})

export const signup: RequestHandler = async (req, res, next) => {
  const { username, password, remember } = req.body

  await validateAndThrow(userValidationSchema, username, password)

  const maxAge = getMaxAge(remember) / 1000
  const user = await userService.create(username, password)
  const token = jwtUtils.createToken(user._id, maxAge)

  res
    .cookie('jwt', token, getCookieOptions(remember))
    .json(user.removePassword())
}

export const login: RequestHandler = async (req, res, next) => {
  const { username, password, remember } = req.body

  const user = await userService.getByUsername(username)

  await user.validatePassword(password)

  const maxAge = getMaxAge(remember) / 1000
  const token = jwtUtils.createToken(user._id, maxAge)

  res
    .cookie('jwt', token, getCookieOptions(remember))
    .json(user.removePassword())
}

export const whoami: RequestHandler = async (req, res, next) => {
  const jwt = req.cookies.jwt

  const token = jwtUtils.validateToken(jwt)

  if (!token) {
    res.json(null)
    return
  }

  userService
    .getById(token._id)
    .then(user => res.json(user.removePassword()))
    .catch(() => res.clearCookie('jwt', getCookieOptions(false)).json(null))
}

export const logout: RequestHandler = async (req, res, next) => {
  res.clearCookie('jwt', getCookieOptions(false)).status(200).json({})
}
