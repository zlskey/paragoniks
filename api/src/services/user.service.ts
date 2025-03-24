import type { IProfile, IUser } from 'src/models/user.model'
import type { UserId } from 'src/types/generic.types'

import constants from 'src/constants'
import { ErrorObject } from 'src/middlewares/error.middleware'
import User from 'src/models/user.model'

export async function create(username: string, password: string): Promise<Omit<IUser, 'password'>> {
  try {
    if (!username || !password) {
      throw new ErrorObject(constants.missing_args)
    }

    const user = await User.create({ username, password })

    return user.removePassword()
  }
  catch (err: any) {
    if (err?.code === 11000) {
      throw new ErrorObject(constants.username_duplicate)
    }

    throw err
  }
}

export async function getByUsername(username: IUser['username']): Promise<IUser> {
  const user = await User.findOne({ username })

  if (!user) {
    throw new ErrorObject(constants.invalid_username, 401)
  }

  return user
}

export async function getById(userId: UserId | string): Promise<IUser> {
  const user = await User.findById(userId)

  if (!user) {
    throw new ErrorObject(constants.invalid_username, 401)
  }

  return user
}

export async function remove(userId: UserId): Promise<void> {
  await getById(userId) // to validate if user exist
  await User.findByIdAndRemove(userId)
}

export async function update(userId: UserId, payload: any): Promise<IUser> {
  return await User.findByIdAndUpdate(userId, payload, { new: true })
}

export async function getProfile(userId: UserId): Promise<IProfile | null> {
  const user = await User.findOne({ _id: userId })

  if (!user) {
    return null
  }

  return user.pickProfile()
}

export async function getProfiles(usersIds: UserId[]): Promise<IProfile[]> {
  const users = await User.find({ _id: { $in: usersIds } })

  return users.map(user => user.pickProfile())
}
