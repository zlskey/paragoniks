import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import multer from 'multer'
import { receiptMiddleware } from 'src/middlewares'
import { receiptController } from '../controllers'
import { wrapAsync } from '../utils'
import singleReceiptRouter from './single-receipt.router'

const receiptRouter = Router()

const NODE_ENV = process.env.NODE_ENV

const upload = multer({ dest: 'uploads/' })

const limiter = rateLimit({
  windowMs: 6 * 60 * 60 * 1000, // 6 hours
  max: NODE_ENV === 'production' ? 2 : Infinity, // limit each IP to 10 requests per windowMs
})

receiptRouter.get('/', wrapAsync(receiptController.handleGetUserReceipts))

receiptRouter.post(
  '/',
  limiter,
  upload.single('image'),
  wrapAsync(receiptController.handleCreateReceipt),
)

receiptRouter.post(
  '/base64',
  wrapAsync(receiptController.handleCreateReceiptBase64),
)

receiptRouter.use(
  '/:receiptId',
  receiptMiddleware.findAndValidateReceipt,
  singleReceiptRouter,
)

export default receiptRouter
