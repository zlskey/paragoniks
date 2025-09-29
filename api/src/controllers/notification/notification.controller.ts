import type { RequestHandler } from 'express'
import constants from 'src/constants'
import { ErrorObject } from 'src/middlewares/error.middleware'
import { userService } from 'src/services'

export const handleRegisterPushToken: RequestHandler = async (req, res) => {
  const { notificationsToken } = req.body
  const user = req.user

  if (notificationsToken === undefined) {
    throw new ErrorObject(constants.missing_args)
  }

  await userService.update(user._id, { notificationsToken })

  res.status(200).json({ success: true })
}
