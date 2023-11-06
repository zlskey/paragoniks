import { RequestHandler } from 'express'
import _ from 'lodash'

export const changePassword: RequestHandler = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body

  const user = req.user

  await user.validatePassword(currentPassword)
  await user.changePassword(newPassword)

  res.status(202).json('success')
}

export const changeUsername: RequestHandler = async (req, res, next) => {
  const { username } = req.body

  const user = req.user
  const updatedUser = await user.changeUsername(username)

  res.status(201).json(updatedUser)
}
