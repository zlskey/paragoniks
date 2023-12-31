import { ProductId, UserId } from 'src/types/generic.types'
import { receiptService, userService } from 'src/services'

import { RequestHandler } from 'express'
import { extractReceiptDataFromText } from 'src/utils/extract-receipt-data-from-text'
import { getTextFromImage } from 'src/utils/get-text-from-image'

export const handleGetUserReceipts: RequestHandler = async (req, res, next) => {
  const user = req.user

  const receipts = await receiptService.getAllReceipts(user._id)

  res.status(200).json(receipts)
}

export const handleCreateReceipt: RequestHandler = async (req, res, next) => {
  const receiptImage = req.file
  const user = req.user

  const text = await getTextFromImage(receiptImage.path)
  const receipt = await extractReceiptDataFromText(text)

  const receiptObj = await receiptService.createReceipt(
    { ...receipt, imagePath: receiptImage.path },
    user._id
  )

  res.status(201).json(receiptObj)
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

  await receiptService.removeReceiptForUser(receipt, user._id)

  const receipts = await receiptService.getAllReceipts(user._id)

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
    productId as unknown as ProductId,
    user._id
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
  const user = req.user
  const { contributorId } = req.params

  const updatedReceipt = await receiptService.addContributor(
    receipt,
    user._id,
    contributorId as unknown as UserId
  )

  res.status(201).json(updatedReceipt)
}

export const handleRemoveContributor: RequestHandler = async (
  req,
  res,
  next
) => {
  const receipt = req.receipt
  const { contributorId } = req.params

  const updatedReceipt = await receiptService.removeContributor(
    receipt,
    contributorId as unknown as UserId
  )

  res.status(201).json(updatedReceipt)
}

export const handleUpdateProduct: RequestHandler = async (req, res, next) => {
  const receipt = req.receipt
  const { productId } = req.params
  const { product } = req.body

  const updatedReceipt = await receiptService.updateProduct(
    receipt,
    productId as unknown as ProductId,
    product
  )

  res.status(201).json(updatedReceipt)
}

export const handleRemoveProduct: RequestHandler = async (req, res, next) => {
  const receipt = req.receipt
  const { productId } = req.params

  const updatedReceipt = await receiptService.removeProduct(
    receipt,
    productId as unknown as ProductId
  )

  res.status(201).json(updatedReceipt)
}

export const handleGetContributors: RequestHandler = async (req, res, next) => {
  const receipt = req.receipt

  const contributors = receiptService.getContributors(receipt)

  const profiles = await userService.getProfiles(contributors)

  res.status(200).json(profiles)
}
