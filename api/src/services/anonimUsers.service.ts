import type { IAnonimModel } from 'src/models/anonim.model'
import type { AvatarColor, UserId } from 'src/types'
import constants from 'src/constants'
import { ErrorObject } from 'src/middlewares/error.middleware'
import AnonimModel from 'src/models/anonim.model'
import { receiptService } from '.'

export async function create(ownerId: UserId, username: string, avatarColor: AvatarColor): Promise<IAnonimModel> {
  if (!username || !avatarColor) {
    throw new ErrorObject(constants.missing_args)
  }

  const isOccupied = await AnonimModel.exists({ ownerId, username })

  if (isOccupied) {
    throw new ErrorObject(constants.username_duplicate)
  }

  return AnonimModel.create({ username, ownerId, avatarColor })
}

export async function getByUsername(ownerId: UserId, username: IAnonimModel['username']): Promise<IAnonimModel> {
  const anonim = await AnonimModel.findOne({ username, ownerId })

  if (!anonim) {
    throw new ErrorObject(constants.invalid_username, 401)
  }

  return anonim
}

export async function getById(anonimId: UserId | string): Promise<IAnonimModel> {
  const anonim = await AnonimModel.findById(anonimId)

  if (!anonim) {
    throw new ErrorObject(constants.invalid_username, 401)
  }

  return anonim
}

export async function removeByUsername(ownerId: UserId, username: string): Promise<void> {
  const anonim = await getByUsername(ownerId, username)
  await receiptService.removeUserFromAllReceipts(anonim._id, ownerId)
  await AnonimModel.findOneAndRemove({ ownerId, username })
}

export async function update(ownerId: UserId, username: string, payload: any): Promise<IAnonimModel> {
  return await AnonimModel.findOneAndUpdate({ ownerId, username }, payload, {
    new: true,
  })
}

export async function getAllUserAnonims(ownerId: UserId) {
  return await AnonimModel.find({ ownerId })
}
