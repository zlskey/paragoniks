import { RequestHandler } from 'express'
import { UserId } from 'src/types/generic.types'
import _ from 'lodash'
import constants from 'src/constants'
import { userService } from 'src/services'

export const handleChangeUsername: RequestHandler = async (req, res, next) => {
  const { username } = req.body

  const user = req.user
  const updatedUser = await user.changeUsername(username)

  res.status(201).json(updatedUser)
}

export const handleChangePassword: RequestHandler = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body

  const user = req.user

  await user.validatePassword(currentPassword)
  await user.changePassword(newPassword)

  res.status(202).json('success')
}

export const handleToggleTheme: RequestHandler = async (req, res, next) => {
  const user = req.user

  const updatedUser = await user.toggleTheme()

  res.status(201).json(updatedUser)
}

export const handleChangeAvatarColor: RequestHandler = async (
  req,
  res,
  next
) => {
  const user = req.user
  const { color } = req.body

  const updatedUser = await user.changeAvatarColor(color)

  res.status(201).json(updatedUser)
}

export const handleChangeAvatarImage: RequestHandler = async (
  req,
  res,
  next
) => {
  const user = req.user
  const image = req.file.path

  const updatedUser = await user.changeAvatarImage(image)

  res.status(201).json(updatedUser)
}

export const handleGetProfile: RequestHandler = async (req, res, next) => {
  const { userId } = req.params

  if (!userId) {
    throw new Error(constants.missing_args)
  }

  const profile = await userService.getProfile(userId as unknown as UserId)

  res.status(201).json(profile)
}

export const handleSetLang: RequestHandler = async (req, res, next) => {
  const { lang } = req.params

  const user = req.user

  const profile = await user.setLang(lang)

  res.status(201).json(profile)
}
