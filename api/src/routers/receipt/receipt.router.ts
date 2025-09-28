import { Router } from 'express'
import { receiptController } from 'src/controllers'
import { authMiddleware, receiptMiddleware } from 'src/middlewares'
import { wrapAsync } from 'src/utils'
import singleReceiptRouter from './single-receipt.router'

const receiptRouter = Router()

receiptRouter.use(authMiddleware)

receiptRouter.get('/', wrapAsync(receiptController.handleGetUserReceipts))

receiptRouter.post('/', wrapAsync(receiptController.handleCreateReceipt))

receiptRouter.use(
  '/:receiptId',
  receiptMiddleware.findAndValidateReceipt,
  singleReceiptRouter,
)

export default receiptRouter
