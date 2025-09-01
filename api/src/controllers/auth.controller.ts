import type { RequestHandler } from 'express'
import config from 'src/config'
import constants from 'src/constants'
import { ErrorObject } from 'src/middlewares/error.middleware'
import { userService } from 'src/services'
import { jwtUtils } from 'src/utils'
import { getJwtFromHeader } from 'src/utils/get-jwt-from-header'
import {
  userValidationSchema,
  validateAndThrow,
} from 'src/utils/user-validation-schema'

function parseUsernameFromEmail(email: string) {
  return email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
}

const cookieOptions = {
  maxAge: config.MAX_COOKIE_AGE,
  httpOnly: true,
  secure: true,
  domain: config.MAIN_DOMAIN,
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
  const token = jwtUtils.createToken(user._id, config.MAX_COOKIE_AGE)

  res.cookie('jwt', token, cookieOptions).json({
    user: user.removePassword(),
    token,
  })
}

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body

  const user = await userService.getByUsername(username)

  await user.validatePassword(password)

  const token = jwtUtils.createToken(user._id, config.MAX_COOKIE_AGE)

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

export const loginWithGoogle: RequestHandler = async (req, res) => {
  const { idToken } = req.body as { idToken?: string }

  if (!idToken) {
    throw new ErrorObject(constants.missing_args)
  }

  const { OAuth2Client } = await import('google-auth-library')
  const client = new OAuth2Client()
  const audiences = [
    config.GOOGLE_ANDROID_CLIENT_ID,
    config.GOOGLE_IOS_CLIENT_ID,
    config.GOOGLE_WEB_CLIENT_ID,
  ].filter(Boolean) as string[]

  const ticket = await client.verifyIdToken({ idToken, audience: audiences })
  const payload = ticket.getPayload()

  if (!payload || !payload.sub || !payload.email) {
    throw new ErrorObject('Invalid Google token', 401)
  }

  const username = parseUsernameFromEmail(payload.email)

  const user = await userService.findOrCreateGoogleAccount({
    username,
    email: payload.email,
    googleId: payload.sub,
    avatarImage: payload.picture ?? '',
  })

  const token = jwtUtils.createToken(user._id, config.MAX_COOKIE_AGE)
  res.cookie('jwt', token, cookieOptions).json({ user: user.removePassword(), token })
}
