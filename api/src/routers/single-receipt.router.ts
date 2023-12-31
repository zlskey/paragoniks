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

singleReceiptRouter.get(
  '/contributors',
  wrapAsync(receiptController.handleGetContributors)
)

singleReceiptRouter.patch(
  '/product/:productId',
  wrapAsync(receiptController.handleUpdateProduct)
)

singleReceiptRouter.delete(
  '/product/:productId',
  wrapAsync(receiptController.handleRemoveProduct)
)

singleReceiptRouter.patch(
  '/product/:productId/comprising',
  wrapAsync(receiptController.handleToggleComprising)
)

singleReceiptRouter.patch(
  '/friend/:contributorId',
  wrapAsync(receiptController.handleAddContributor)
)

singleReceiptRouter.delete(
  '/friend/:contributorId',
  wrapAsync(receiptController.handleRemoveContributor)
)

export default singleReceiptRouter
