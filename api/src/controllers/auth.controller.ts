import type { RequestHandler } from 'express'
import config from 'src/config'
import constants from 'src/constants'
import { sendPasswordRecoveryEmail, sendWelcomeEmail } from 'src/mailing'
import { ErrorObject } from 'src/middlewares/error.middleware'
import { mailConfirmationService, passwordRecoveryService, userService } from 'src/services'
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
  domain: config.MAIN_DOMAIN,
  httpOnly: true,
  secure: true,
}

const emptyUserResponse = {
  token: null,
  user: null,
}

export const handleCheckIfUsernameIsTaken: RequestHandler = async (req, res) => {
  const { username } = req.body

  if (!username) {
    throw new ErrorObject(constants.missing_args)
  }

  const isTaken = await userService.checkIfUsernameIsTaken(username as string)

  res.status(200).json(isTaken)
}

export const handleCheckIfEmailIsTaken: RequestHandler = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new ErrorObject(constants.missing_args)
  }

  const isTaken = await userService.checkIfEmailIsTaken(email as string)

  res.status(200).json(isTaken)
}

export const handleCheckIfUsernameOrEmailIsTaken: RequestHandler = async (req, res) => {
  const { usernameOrEmail, excludeGoogleAccount } = req.body

  if (!usernameOrEmail) {
    throw new ErrorObject(constants.missing_args)
  }

  const isEmail = usernameOrEmail.includes('@')
  const isTaken = isEmail
    ? await userService.checkIfEmailIsTaken(usernameOrEmail as string, excludeGoogleAccount)
    : await userService.checkIfUsernameIsTaken(usernameOrEmail as string, excludeGoogleAccount)

  res.status(200).json(isTaken)
}

export const signup: RequestHandler = async (req, res) => {
  const { username, email, password, avatarImage } = req.body

  await validateAndThrow(userValidationSchema, username, email, password)

  const user = await userService.create(username, email, password, avatarImage)

  if (email) {
    const { hash } = await mailConfirmationService.create(user._id)
    await sendWelcomeEmail(
      email,
      user.username,
      `${config.CORS_ORIGIN}/a/confirm?h=${hash}&uid=${user._id}`,
    )
  }

  const token = jwtUtils.createToken(user._id, config.MAX_COOKIE_AGE)

  res.cookie('jwt', token, cookieOptions).json({
    user: user.removePassword(),
    token,
  })
}

export const login: RequestHandler = async (req, res) => {
  const { usernameOrEmail, password } = req.body

  const user = await userService.getByUsernameOrEmail(usernameOrEmail)

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

export const handleSendPasswordRecoveryEmail: RequestHandler = async (req, res) => {
  const { usernameOrEmail } = req.body

  if (!usernameOrEmail) {
    throw new ErrorObject(constants.missing_args)
  }

  const isEmail = usernameOrEmail.includes('@')
  const { _id: accountId } = isEmail
    ? await userService.checkIfEmailIsTaken(usernameOrEmail as string, true)
    : await userService.checkIfUsernameIsTaken(usernameOrEmail as string, true)

  const user = await userService.getById(accountId)

  if (!user.email) {
    throw new ErrorObject('Użytkownik istnieje, ale nie ma powiązanego adresu e-mail')
  }

  const canResendCode = await passwordRecoveryService.verifyIfCanResendCode(accountId)

  if (!canResendCode) {
    throw new ErrorObject('Nie można wysłać kodu do resetowania hasła, spróbuj ponownie za 30 sekund')
  }

  const { code } = await passwordRecoveryService.create(accountId)

  await sendPasswordRecoveryEmail(user.email, user.username, code)

  res.json({ userId: user._id })
}

export const handlePasswordRecoveryCode: RequestHandler = async (req, res) => {
  const { code, userId } = req.body

  if (!code) {
    throw new ErrorObject(constants.missing_args)
  }

  const isCodeValid = await passwordRecoveryService.verifyAndDeleteIfValid(userId, code)

  if (!isCodeValid) {
    throw new ErrorObject('Kod do zresetowania hasła jest nieprawidłowy')
  }

  const user = await userService.getById(userId)

  const token = jwtUtils.createToken(user._id, config.MAX_COOKIE_AGE)
  res.cookie('jwt', token, cookieOptions).json({ user: user.removePassword(), token })
}

export const handleUpdatePassword: RequestHandler = async (req, res) => {
  const { password } = req.body

  const user = req.user

  await user.changePassword(password)

  res.json({ success: true })
}

export const handleConfirmEmail: RequestHandler = async (req, res) => {
  const { hash, accountId } = req.body

  if (!hash) {
    throw new ErrorObject(constants.missing_args)
  }

  const mailConfirmation = await mailConfirmationService.verify(accountId, hash)

  await userService.setMailAsConfirmed(mailConfirmation.accountId)

  res.json({ success: true })
}
