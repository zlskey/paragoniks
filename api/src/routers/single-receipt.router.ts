import { Router } from 'express'
import { receiptController } from 'src/controllers'
import { wrapAsync } from 'src/utils'

const singleReceiptRouter = Router()

singleReceiptRouter.get(
  '/',
  wrapAsync(receiptController.handleGetSingleReceipt)
)

singleReceiptRouter.delete(
  '/',
  wrapAsync(receiptController.handleRemoveReceipt)
)

singleReceiptRouter.patch(
  '/title',
  wrapAsync(receiptController.handleChangeReceiptTitle)
)

singleReceiptRouter.patch(
  '/product/:productId',
  wrapAsync(receiptController.handleUpdateProduct)
)

singleReceiptRouter.patch(
  '/product/:productId/comprising',
  wrapAsync(receiptController.handleToggleComprising)
)
singleReceiptRouter.patch(
  '/friend/:username',
  wrapAsync(receiptController.handleAddContributor)
)

singleReceiptRouter.delete(
  '/friend/:username',
  wrapAsync(receiptController.handleRemoveContributor)
)

export default singleReceiptRouter
