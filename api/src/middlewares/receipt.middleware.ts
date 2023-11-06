import { ErrorObject } from './error.middleware'
import { IReceipt } from 'src/models/receipt.model'
import { RequestHandler } from 'express'
import { receiptService } from 'src/services'

declare global {
  namespace Express {
    interface Request {
      receipt?: IReceipt
    }
  }
}

export const findAndValidateReceipt: RequestHandler = async (
  req,
  res,
  next
) => {
  const { receiptId } = req.params

  const { username } = req.user

  const receipt = await receiptService.getReceipt(receiptId)

  const { owner, contributors } = receipt

  if (owner === username || contributors.includes(username)) {
    req.receipt = receipt

    return next()
  }

  return next(
    new ErrorObject('You are not authorized to view this receipt', 403)
  )
}
