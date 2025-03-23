import User, { IProfile, IUser } from 'src/models/user.model'

import { ErrorObject } from 'src/middlewares/error.middleware'
import { UserId } from 'src/types/generic.types'
import constants from 'src/constants'

export const create = async (
  username: string,
  password: string
): Promise<Omit<IUser, 'password'>> => {
  try {
    if (!username || !password) {
      throw new ErrorObject(constants.missing_args)
    }

    const user = await User.create({ username, password })

    return user.removePassword()
  } catch (err: any) {
    if (err?.code === 11000) {
      throw new ErrorObject(constants.username_duplicate)
    }

    throw err
  }
}

export const getByUsername = async (
  username: IUser['username']
): Promise<IUser> => {
  const user = await User.findOne({ username })

  if (!user) {
    throw new ErrorObject(constants.invalid_username, 401)
  }

  return user
}

export const getById = async (userId: UserId | string): Promise<IUser> => {
  const user = await User.findById(userId)

  if (!user) {
    throw new ErrorObject(constants.invalid_username, 401)
  }

  return user
}

export const remove = async (userId: UserId): Promise<void> => {
  await getById(userId) // to validate if user exist
  await User.findByIdAndRemove(userId)
}

export const update = async (userId: UserId, payload: any): Promise<IUser> => {
  return await User.findByIdAndUpdate(userId, payload, { new: true })
}

export const getProfile = async (userId: UserId): Promise<IProfile | null> => {
  const user = await User.findOne({ _id: userId })

  if (!user) {
    return null
  }

  return user.pickProfile()
}

export const getProfiles = async (usersIds: UserId[]): Promise<IProfile[]> => {
  const users = await User.find({ _id: { $in: usersIds } })

  return users.map(user => user.pickProfile())
}
