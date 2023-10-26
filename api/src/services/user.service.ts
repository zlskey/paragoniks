import User, { IUser } from 'src/models/User.model'

import { ErrorObject } from 'src/middlewares/error.middleware'
import _ from 'lodash'
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

export const getById = async (id: IUser['_id'] | string): Promise<IUser> => {
  const user = await User.findById(id)

  if (!user) {
    throw new ErrorObject(constants.invalid_username, 401)
  }

  return user
}

export const remove = async (userId: IUser['_id']): Promise<void> => {
  await getById(userId) // to validate if user exist
  await User.findByIdAndRemove(userId)
}

export const update = async (
  userId: IUser['_id'],
  payload: any
): Promise<IUser> => {
  return await User.findByIdAndUpdate(userId, payload, { new: true })
}
