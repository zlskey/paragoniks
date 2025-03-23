import { anonimUsersService } from 'src/services'

import { RequestHandler } from 'express'
import { writeFileSync } from 'fs'

export const createAnonim: RequestHandler = async (req, res, next) => {
  const user = req.user
  const { username, avatarColor } = req.body

  await anonimUsersService.create(user._id, username, avatarColor)

  res.status(201).end()
}

export const getAllUserAnonims: RequestHandler = async (req, res, next) => {
  const user = req.user
  const anonims = await anonimUsersService.getAllUserAnonims(user._id)

  res.status(200).json(anonims)
}

export const removeAnonim: RequestHandler = async (req, res, next) => {
  const user = req.user
  const { username } = req.body

  await anonimUsersService.removeByUsername(user._id, username)

  res.status(200).end()
}

// unimplemented
export const handleChangeUsername: RequestHandler = async (req, res, next) => {
  const { username, currentUsername } = req.body

  const user = req.user
  await anonimUsersService.update(user._id, currentUsername, username)

  res.status(200).end()
}

// unimplemented
export const handleChangeAvatarImage: RequestHandler = async (
  req,
  res,
  next
) => {
  const user = req.user
  const { username } = req.body
  const avatarImage = Buffer.from(req.body.image, 'base64')
  const imagePath = `uploads/${
    user._id
  }_a:${username}_${new Date().getTime()}.png`
  writeFileSync(imagePath, avatarImage)

  await anonimUsersService.update(user._id, username, { avatarImage })

  res.status(200).end()
}
