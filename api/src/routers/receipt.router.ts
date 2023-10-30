import { Router } from 'express'
import multer from 'multer'
import { receiptController } from '../controllers'
import { wrapAsync } from '../utils'

const receiptRouter = Router()

const upload = multer({ dest: 'uploads/' })

receiptRouter.get('/', wrapAsync(receiptController.handleGetUserReceipts))

receiptRouter.post(
  '/',
  upload.single('image'),
  wrapAsync(receiptController.handleCreateReceipt)
)

receiptRouter.get(
  '/:receiptId',
  wrapAsync(receiptController.handleGetSingleReceipt)
)

receiptRouter.delete(
  '/:receiptId',
  wrapAsync(receiptController.handleRemoveReceipt)
)

receiptRouter.patch(
  '/:receiptId/comprising/:itemId',
  wrapAsync(receiptController.handleToggleComprising)
)

receiptRouter.patch(
  '/:receiptId/title',
  wrapAsync(receiptController.handleChangeReceiptTitle)
)

receiptRouter.patch(
  '/:receiptId/friend/:username',
  wrapAsync(receiptController.handleAddContributor)
)

receiptRouter.delete(
  '/:receiptId/friend/:username',
  wrapAsync(receiptController.handleRemoveContributor)
)

export default receiptRouter
