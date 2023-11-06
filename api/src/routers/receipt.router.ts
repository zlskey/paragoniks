import { Router } from 'express'
import multer from 'multer'
import { receiptController } from '../controllers'
import { receiptMiddleware } from 'src/middlewares'
import singleReceiptRouter from './single-receipt.router'
import { wrapAsync } from '../utils'

const receiptRouter = Router()

const upload = multer({ dest: 'uploads/' })

receiptRouter.get('/', wrapAsync(receiptController.handleGetUserReceipts))

receiptRouter.post(
  '/',
  upload.single('image'),
  wrapAsync(receiptController.handleCreateReceipt)
)

receiptRouter.use(
  '/:receiptId',
  receiptMiddleware.findAndValidateReceipt,
  singleReceiptRouter
)

export default receiptRouter
