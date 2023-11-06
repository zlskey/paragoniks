import { RequestHandler } from 'express'
import { extractReceiptDataFromText } from 'src/utils/extract-receipt-data-from-text'
import { getTextFromImage } from 'src/utils/get-text-from-image'
import { receiptService } from 'src/services'

export const handleGetUserReceipts: RequestHandler = async (req, res, next) => {
  const user = req.user

  const receipts = await receiptService.getAllReceipts(user.username)

  res.status(200).json(receipts)
}

export const handleCreateReceipt: RequestHandler = async (req, res, next) => {
  const receiptImage = req.file
  const user = req.user

  const text = await getTextFromImage(receiptImage.path)
  const receipt = await extractReceiptDataFromText(text)

  await receiptService.createReceipt(
    { ...receipt, imagePath: receiptImage.path },
    user
  )

  const receipts = await receiptService.getAllReceipts(user.username)

  res.status(201).json(receipts)
}

export const handleGetSingleReceipt: RequestHandler = async (
  req,
  res,
  next
) => {
  res.status(200).json(req.receipt)
}

export const handleRemoveReceipt: RequestHandler = async (req, res, next) => {
  const receipt = req.receipt
  const user = req.user

  await receiptService.removeReceiptForUser(receipt, user)

  const receipts = await receiptService.getAllReceipts(user.username)

  res.status(200).json(receipts)
}

export const handleToggleComprising: RequestHandler = async (
  req,
  res,
  next
) => {
  const receipt = req.receipt
  const { productId } = req.params

  const user = req.user

  const updatedReceipt = await receiptService.toggleComprising(
    receipt,
    productId,
    user.username
  )

  res.status(200).json(updatedReceipt)
}

export const handleChangeReceiptTitle: RequestHandler = async (
  req,
  res,
  next
) => {
  const receipt = req.receipt
  const { newTitle } = req.body

  const updatedReceipt = await receiptService.changeReceiptTitle(
    receipt,
    newTitle
  )

  res.status(200).json(updatedReceipt)
}

export const handleAddContributor: RequestHandler = async (req, res, next) => {
  const receipt = req.receipt
  const { username } = req.params

  const updatedReceipt = await receiptService.addContributor(receipt, username)

  res.status(201).json(updatedReceipt)
}

export const handleRemoveContributor: RequestHandler = async (
  req,
  res,
  next
) => {
  const receipt = req.receipt
  const { username } = req.params

  const updatedReceipt = await receiptService.removeContributor(
    receipt,
    username
  )

  res.status(201).json(updatedReceipt)
}

export const handleUpdateProduct: RequestHandler = async (req, res, next) => {
  const receipt = req.receipt
  const { productId } = req.params
  const { product } = req.body

  const updatedReceipt = await receiptService.updateProduct(
    receipt,
    productId,
    product
  )

  res.status(201).json(updatedReceipt)
}
