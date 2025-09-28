import type { RequestHandler } from 'express'

import type { UserId } from 'src/types'
import config from 'src/config'
import constants from 'src/constants'
import { sendMailConfirmationEmail } from 'src/mailing/send-mail-confirmation-email'
import { anonimUsersService, friendService, mailConfirmationService, userService } from 'src/services'
import { uploadAvatarImage } from 'src/utils/gcp/bucket'
import { getCompressedImageBufferFromBase64 } from 'src/utils/image.utils'

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

export const handleChangeEmail: RequestHandler = async (req, res) => {
  const { email } = req.body

  const user = req.user

  const { hash } = await mailConfirmationService.create(user._id)
  await sendMailConfirmationEmail(email, user.username, `${config.CORS_ORIGIN}/confirm?h=${hash}&uid=${user._id}`)
  const updatedUser = await userService.changeEmail(user._id, email)
  res.status(201).json(updatedUser)
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

  const compressedImageBuffer = await getCompressedImageBufferFromBase64(req.body.image)
  const imagePath = await uploadAvatarImage(user._id.toString(), compressedImageBuffer)
  const updatedUser = await user.changeAvatarImage(imagePath)

  res.status(201).json(updatedUser)
}

export const handleGetFriends: RequestHandler = async (req, res) => {
  const user = req.user

  const userFriendsIds = await friendService.findAllUserAcceptedFriendsIds(user._id)
  const userFriendsProfiles = await userService.getProfiles(userFriendsIds)
  const userAnonims = await anonimUsersService.getAllUserAnonims(user._id)
  const combined = [...userFriendsProfiles, ...userAnonims]

  res.status(200).json(combined)
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

export const handleUpdateMeta: RequestHandler = async (req, res) => {
  const { meta } = req.body

  const user = req.user

  const profile = await user.updateMeta(meta)

  res.status(201).json(profile)
}
