import type { IProfile, IUser } from 'src/models/user.model'
import type { UserId } from 'src/types/backend.types'

import constants from 'src/constants'
import { ErrorObject } from 'src/middlewares/error.middleware'
import User from 'src/models/user.model'

export async function create(
  username: string,
  password: string,
  avatarImage: string,
): Promise<Omit<IUser, 'password'>> {
  try {
    if (!username || !password) {
      throw new ErrorObject(constants.missing_args)
    }

    const user = await User.create({ username, password, avatarImage })

    return user.removePassword()
  }
  catch (err: any) {
    if (err?.code === 11000) {
      throw new ErrorObject(constants.username_duplicate)
    }

    throw err
  }
}

export async function findOrCreateGoogleAccount(payload: Partial<IUser> & { username: string }): Promise<IUser> {
  const { username, email, googleId, avatarImage } = payload
  const foundAccount = await User.findOne({ googleId })

  if (foundAccount) {
    return await getById(foundAccount._id)
  }

  if (await checkIfEmailIsTaken(email)) {
    throw new ErrorObject(constants.email_duplicate, 400)
  }

  const availableUsername = await generateAvailableUsername(username)

  const created = await User.create({ username: availableUsername, email, googleId, avatarImage })
  return created.removePassword()
}

export async function checkIfEmailIsTaken(email: string): Promise<boolean> {
  const user = await User.exists({ email: { $eq: email } })
  return !!user
}

export async function checkIfUsernameIsTaken(username: string): Promise<boolean> {
  const user = await User.exists({ username: { $eq: username } })
  return !!user
}

export async function generateAvailableUsername(username: string, increment: number = 1): Promise<string> {
  const newUsername = `${username}${increment === 1 ? '' : increment}`

  if (await checkIfUsernameIsTaken(newUsername)) {
    return generateAvailableUsername(username, increment + 1)
  }

  return newUsername
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
