import type { UserId } from 'src/types'
import config from 'src/config'
import { ErrorObject } from 'src/middlewares/error.middleware'
import PasswordRecoveryModel from 'src/models/passwordRecovery.model'

export async function getByAccountId(accountId: UserId) {
  return await PasswordRecoveryModel.findOne({ accountId })
}

export async function create(accountId: UserId) {
  const pin = Math.floor(100000 + Math.random() * 900000)

  await PasswordRecoveryModel.deleteOne({ accountId })

  return await PasswordRecoveryModel.create({
    accountId,
    code: pin.toString(),
  })
}

export async function verifyAndDeleteIfValid(accountId: UserId, code: string) {
  const passwordRecovery = await getByAccountId(accountId)
  if (!passwordRecovery) {
    throw new ErrorObject('Pin do odzyskania hasła nie istnieje, lub wygasł')
  }
  if (passwordRecovery.isExpired()) {
    throw new ErrorObject('Pin do odzyskania hasła wygasł')
  }
  if (passwordRecovery.code !== code) {
    throw new ErrorObject('Pin do odzyskania hasła jest nieprawidłowy')
  }
  await PasswordRecoveryModel.deleteOne({ accountId })
  return true
}

export async function verifyIfCanResendCode(accountId: UserId) {
  const passwordRecovery = await getByAccountId(accountId)

  if (!passwordRecovery) {
    return true
  }

  if (passwordRecovery.isExpired()) {
    return true
  }

  return passwordRecovery.updatedAt < new Date(Date.now() - config.PASSWORD_RECOVERY_RESEND_CODE_TIME)
}
