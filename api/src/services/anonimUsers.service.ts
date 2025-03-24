import type { IAnonim } from 'src/models/anonim.model'
import type { AvatarColor } from 'src/models/user.model'

import type { UserId } from 'src/types/generic.types'
import constants from 'src/constants'
import { ErrorObject } from 'src/middlewares/error.middleware'
import Anonim from 'src/models/anonim.model'
import { receiptService } from '.'

export async function create(ownerId: UserId, username: string, avatarColor: AvatarColor): Promise<IAnonim> {
  if (!username || !avatarColor) {
    throw new ErrorObject(constants.missing_args)
  }

  const isOccupied = await Anonim.exists({ ownerId, username })

  if (isOccupied) {
    throw new ErrorObject(constants.username_duplicate)
  }

  return Anonim.create({ username, ownerId, avatarColor })
}

export async function getByUsername(ownerId: UserId, username: IAnonim['username']): Promise<IAnonim> {
  const anonim = await Anonim.findOne({ username, ownerId })

  if (!anonim) {
    throw new ErrorObject(constants.invalid_username, 401)
  }

  return anonim
}

export async function getById(anonimId: UserId | string): Promise<IAnonim> {
  const anonim = await Anonim.findById(anonimId)

  if (!anonim) {
    throw new ErrorObject(constants.invalid_username, 401)
  }

  return anonim
}

export async function removeByUsername(ownerId: UserId, username: string): Promise<void> {
  const anonim = await getByUsername(ownerId, username)
  await receiptService.removeUserFromAllReceipts(anonim._id, ownerId)
  await Anonim.findOneAndRemove({ ownerId, username })
}

export async function update(ownerId: UserId, username: string, payload: any): Promise<IAnonim> {
  return await Anonim.findOneAndUpdate({ ownerId, username }, payload, {
    new: true,
  })
}

export async function getAllUserAnonims(ownerId: UserId) {
  return await Anonim.find({ ownerId })
}
