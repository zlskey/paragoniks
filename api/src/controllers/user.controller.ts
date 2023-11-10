import { RequestHandler } from 'express'
import _ from 'lodash'

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

export const handleChangeAvatarColor: RequestHandler = async (req, res, next) => {
  const user = req.user
  const { color } = req.body

  const updatedUser = await user.changeAvatarColor(color)

  res.status(201).json(updatedUser)
}

export const handleChangeAvatarImage: RequestHandler = async (req, res, next) => {
  const user = req.user
  const image = req.file.path

  const updatedUser = await user.changeAvatarImage(image)

  res.status(201).json(updatedUser)
}