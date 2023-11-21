import { Router } from 'express'
import multer from 'multer'
import rateLimit from 'express-rate-limit'
import { receiptController } from '../controllers'
import { receiptMiddleware } from 'src/middlewares'
import singleReceiptRouter from './single-receipt.router'
import { wrapAsync } from '../utils'

const receiptRouter = Router()

const NODE_ENV = process.env.NODE_ENV

const upload = multer({ dest: 'uploads/' })

const limiter = rateLimit({
  windowMs: 6 * 60 * 60 * 1000, // 6 hours
  max: NODE_ENV === 'production' ? 2 : undefined, // limit each IP to 10 requests per windowMs
})

receiptRouter.get('/', wrapAsync(receiptController.handleGetUserReceipts))

receiptRouter.post(
  '/',
  limiter,
  upload.single('image'),
  wrapAsync(receiptController.handleCreateReceipt)
)

receiptRouter.use(
  '/:receiptId',
  receiptMiddleware.findAndValidateReceipt,
  singleReceiptRouter
)

export default receiptRouter
