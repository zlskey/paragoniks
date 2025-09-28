import type { RequestHandler } from 'express'
import config from 'src/config'
import constants from 'src/constants'
import { sendPasswordRecoveryEmail } from 'src/mailing'
import { ErrorObject } from 'src/middlewares/error.middleware'
import { passwordRecoveryService, userService } from 'src/services'
import { jwtUtils } from 'src/utils'

const cookieOptions = {
  maxAge: config.MAX_COOKIE_AGE,
  domain: config.MAIN_DOMAIN,
  httpOnly: true,
  secure: true,
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
