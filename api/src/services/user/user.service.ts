import type { IUserModel } from 'src/models/user.model'
import type { Profile, UserId } from 'src/types'
import constants from 'src/constants'
import { ErrorObject } from 'src/middlewares/error.middleware'
import UserModel from 'src/models/user.model'

export async function create(
  username: string,
  email: string | null,
  password: string,
  avatarImage: string,
): Promise<Omit<IUserModel, 'password'>> {
  try {
    if (!username || !password) {
      throw new ErrorObject(constants.missing_args)
    }

    const user = await UserModel.create({
      username,
      password,
      avatarImage,
      meta: { emailToConfirm: email },
    })

    return user.removePassword()
  }
  catch (err: any) {
    if (err?.code === 11000) {
      throw new ErrorObject(constants.username_duplicate)
    }

    throw err
  }
}

export async function findOrCreateGoogleAccount(payload: Partial<IUserModel> & { username: string, email: string }): Promise<IUserModel> {
  const { username, email, googleId, avatarImage } = payload
  const foundAccount = await UserModel.findOne({ googleId })

  if (foundAccount) {
    return await getById(foundAccount._id)
  }

  if (await checkIfEmailIsTaken(email)) {
    throw new ErrorObject(constants.email_duplicate, 400)
  }

  const availableUsername = await generateAvailableUsername(username)

  const created = await UserModel.create({
    'username': availableUsername,
    email,
    googleId,
    avatarImage,
    'meta.provider': 'google',
  })
  return created.removePassword()
}

export async function checkIfEmailIsTaken(email: string, excludeGoogleAccount = false) {
  return await UserModel.exists({
    email: { $eq: email },
    ...(excludeGoogleAccount && { provider: { $exists: false } }),
  })
}

export async function checkIfUsernameIsTaken(username: string, excludeGoogleAccount = false) {
  return await UserModel.exists({
    username: { $eq: username },
    ...(excludeGoogleAccount && { provider: { $exists: false } }),
  })
}

export async function getByUsernameOrEmail(usernameOrEmail: string) {
  return await UserModel.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] })
}

export async function generateAvailableUsername(username: string, increment: number = 1): Promise<string> {
  const newUsername = `${username}${increment === 1 ? '' : increment}`

  if (await checkIfUsernameIsTaken(newUsername)) {
    return generateAvailableUsername(username, increment + 1)
  }

  return newUsername
}

export async function getByUsername(username: IUserModel['username']): Promise<IUserModel> {
  const user = await UserModel.findOne({ username })

  if (!user) {
    throw new ErrorObject(constants.invalid_username, 401)
  }

  return user
}

export async function getById(userId: UserId | string): Promise<IUserModel> {
  const user = await UserModel.findById(userId)

  if (!user) {
    throw new ErrorObject(constants.invalid_username, 401)
  }

  return user
}

export async function remove(userId: UserId): Promise<void> {
  await getById(userId) // to validate if user exist
  await UserModel.findByIdAndRemove(userId)
}

export async function update(userId: UserId, payload: any): Promise<IUserModel> {
  return await UserModel.findByIdAndUpdate(userId, payload, { new: true })
}

export async function getProfile(userId: UserId): Promise<Profile | null> {
  const user = await UserModel.findOne({ _id: userId })

  if (!user) {
    return null
  }

  return user.pickProfile()
}

export async function getProfiles(usersIds: UserId[]): Promise<Profile[]> {
  const users = await UserModel.find({ _id: { $in: usersIds } })

  return users.map(user => user.pickProfile())
}

export async function setMailAsConfirmed(userId: UserId) {
  const user = await getById(userId)
  if (!user.meta.emailToConfirm) {
    throw new ErrorObject('Email jest już potwierdzony')
  }
  await UserModel.findByIdAndUpdate(userId, {
    email: user.meta.emailToConfirm,
    meta: { emailToConfirm: null },
  })
}

export async function changeEmail(userId: UserId, email: string) {
  const user = await getById(userId)
  if (await checkIfEmailIsTaken(email)) {
    throw new ErrorObject(constants.email_duplicate, 400)
  }
  await UserModel.findByIdAndUpdate(userId, { meta: { emailToConfirm: email } })
  return user.removePassword()
}
