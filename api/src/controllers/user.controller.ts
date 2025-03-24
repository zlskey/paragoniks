import type { RequestHandler } from 'express'

import type { UserId } from 'src/types/generic.types'
import { writeFileSync } from 'node:fs'
import constants from 'src/constants'
import { anonimUsersService, userService } from 'src/services'

export const handleChangeUsername: RequestHandler = async (req, res) => {
  const { username } = req.body

  const user = req.user
  const updatedUser = await user.changeUsername(username)

  res.status(201).json(updatedUser)
}

export const handleChangePassword: RequestHandler = async (req, res) => {
  const { currentPassword, newPassword } = req.body

  const user = req.user

  await user.validatePassword(currentPassword)
  await user.changePassword(newPassword)

  res.status(202).json('success')
}

export const handleToggleTheme: RequestHandler = async (req, res) => {
  const user = req.user

  const updatedUser = await user.toggleTheme()

  res.status(201).json(updatedUser)
}

export const handleChangeAvatarColor: RequestHandler = async (req, res) => {
  const user = req.user
  const { color } = req.body

  const updatedUser = await user.changeAvatarColor(color)

  res.status(201).json(updatedUser)
}

export const handleChangeAvatarImage: RequestHandler = async (req, res) => {
  const user = req.user
  const avatarImage = Buffer.from(req.body.image, 'base64').toString()
  const imagePath = `uploads/${user._id}_${new Date().getTime()}.png`
  writeFileSync(imagePath, avatarImage)

  const updatedUser = await user.changeAvatarImage(imagePath)

  res.status(201).json(updatedUser)
}

export const handleGetProfile: RequestHandler = async (req, res) => {
  const { userId } = req.params

  if (!userId) {
    throw new Error(constants.missing_args)
  }

  const profile = await userService.getProfile(userId as unknown as UserId)
  if (profile) {
    res.status(200).json(profile)
    return
  }

  const anonimProfile = await anonimUsersService.getById(
    userId as unknown as UserId,
  )
  if (!anonimProfile) {
    throw new Error(constants.invalid_username)
  }

  res.status(200).json(anonimProfile)
}

export const handleSetLang: RequestHandler = async (req, res) => {
  const { lang } = req.params

  const user = req.user

  const profile = await user.setLang(lang)

  res.status(201).json(profile)
}
