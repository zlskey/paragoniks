import type { UserId } from 'src/types'
import { compare, genSalt, hash } from 'bcryptjs'
import { ErrorObject } from 'src/middlewares/error.middleware'
import MailConfirmationModel from 'src/models/mailConfirmation.model'

export async function create(accountId: UserId) {
  return MailConfirmationModel.create({
    accountId,
    hash: await hash(accountId.toString(), await genSalt()),
  })
}

export async function verify(accountId: UserId) {
  const mailConfirmation = await MailConfirmationModel.findOne({ accountId })
  if (!mailConfirmation) {
    throw new ErrorObject('Kod weryfikacyjny nie istnieje, lub wygasł')
  }
  if (mailConfirmation.isExpired()) {
    throw new ErrorObject('Kod weryfikacyjny wygasł')
  }
  return await compare(accountId.toString(), mailConfirmation.hash)
}
