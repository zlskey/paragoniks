import type { RequestHandler } from 'express'
import constants from 'src/constants'
import { ErrorObject } from 'src/middlewares/error.middleware'
import { validationService } from 'src/services'

export const handleCheckIfUsernameIsTaken: RequestHandler = async (req, res) => {
  const { username } = req.body

  if (!username) {
    throw new ErrorObject(constants.missing_args)
  }

  const isTaken = await validationService.checkIfUsernameIsTaken(username as string)

  res.status(200).json(isTaken)
}

export const handleCheckIfEmailIsTaken: RequestHandler = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new ErrorObject(constants.missing_args)
  }

  const isTaken = await validationService.checkIfEmailIsTaken(email as string)

  res.status(200).json(!!isTaken)
}

export const handleCheckIfUsernameOrEmailIsTaken: RequestHandler = async (req, res) => {
  const { usernameOrEmail, excludeGoogleAccount } = req.body

  if (!usernameOrEmail) {
    throw new ErrorObject(constants.missing_args)
  }

  const isTaken = await validationService.checkIfUsernameOrEmailIsTaken(
    usernameOrEmail as string,
    excludeGoogleAccount,
  )

  res.status(200).json(!!isTaken)
}
