import { Router } from 'express'
import { receiptMiddleware } from 'src/middlewares'
import { receiptController } from '../controllers'
import { wrapAsync } from '../utils'
import singleReceiptRouter from './single-receipt.router'

const receiptRouter = Router()

// const NODE_ENV = process.env.NODE_ENV

// const limiter = rateLimit({
//   windowMs: 6 * 60 * 60 * 1000, // 6 hours
//   max: NODE_ENV === 'production' ? 10 : Infinity, // limit each IP to 10 requests per windowMs
// })

receiptRouter.get('/', wrapAsync(receiptController.handleGetUserReceipts))

receiptRouter.post('/', wrapAsync(receiptController.handleCreateReceipt))

receiptRouter.use(
  '/:receiptId',
  receiptMiddleware.findAndValidateReceipt,
  singleReceiptRouter,
)

export default receiptRouter
