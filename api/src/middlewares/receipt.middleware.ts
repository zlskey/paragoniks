import { ErrorObject } from './error.middleware'
import { IReceipt } from 'src/models/receipt.model'
import { ReceiptId } from 'src/types/generic.types'
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

  const { _id } = req.user

  const receipt = await receiptService.getReceipt(
    receiptId as unknown as ReceiptId
  )

  const { contributors } = receipt

  if (contributors[_id.toString()]) {
    req.receipt = receipt

    return next()
  }

  return next(
    new ErrorObject('You are not authorized to view this receipt', 403)
  )
}
