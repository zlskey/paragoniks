import { Router } from 'express'
import { receiptMiddleware } from 'src/middlewares'
import { receiptController } from '../controllers'
import { wrapAsync } from '../utils'
import singleReceiptRouter from './single-receipt.router'

const receiptRouter = Router()



receiptRouter.get('/', wrapAsync(receiptController.handleGetUserReceipts))

receiptRouter.post('/', wrapAsync(receiptController.handleCreateReceipt))

receiptRouter.use(
  '/:receiptId',
  receiptMiddleware.findAndValidateReceipt,
  singleReceiptRouter,
)

export default receiptRouter
