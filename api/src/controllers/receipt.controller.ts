import { receiptService, userService } from 'src/services'

import { ErrorObject } from 'src/middlewares/error.middleware'
import { RequestHandler } from 'express'
import { extractReceiptDataFromText } from 'src/utils/extract-receipt-data-from-text'
import { getTextFromImage } from 'src/utils/get-text-from-image'

export const handleGetUserReceipts: RequestHandler = async (req, res, next) => {
  const user = await userService.getById(req.userId)

  const receipts = await receiptService.getAllReceipts(user.username)

  res.status(200).json(receipts)
}

export const handleCreateReceipt: RequestHandler = async (req, res, next) => {
  const receiptImage = req.file

  const user = await userService.getById(req.userId)

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
  const { receiptId } = req.params

  const user = await userService.getById(req.userId)

  const receipt = await receiptService.getReceipt(receiptId)

  if (
    receipt.owner !== user.username &&
    !receipt.others.includes(user.username)
  ) {
    throw new ErrorObject('You are not authorized to view this receipt', 403)
  }

  res.status(200).json(receipt)
}

export const handleRemoveReceipt: RequestHandler = async (req, res, next) => {
  const { receiptId } = req.params

  const user = await userService.getById(req.userId)

  await receiptService.removeReceiptForUser(receiptId, user)

  const receipts = await receiptService.getAllReceipts(user.username)

  res.status(200).json(receipts)
}

export const handleToggleComprising: RequestHandler = async (
  req,
  res,
  next
) => {
  const { receiptId, itemId } = req.params

  // @todo
  // const receipt = await receiptService.getReceipt(receiptId)
  // if (receipt.locked) {
  //   throw new ErrorObject('Receipt is locked', 403)
  // }

  const updatedReceipt = await receiptService.toggleComprising(
    receiptId,
    itemId,
    req.username
  )

  res.status(200).json(updatedReceipt)
}

export const handleChangeReceiptTitle: RequestHandler = async (
  req,
  res,
  next
) => {
  const { receiptId } = req.params
  const { newTitle } = req.body

  console.log({
    receiptId,
    newTitle,
  })

  const updatedReceipt = await receiptService.changeReceiptTitle(
    receiptId,
    newTitle
  )

  res.status(200).json(updatedReceipt)
}

export const handleAddContributor: RequestHandler = async (req, res, next) => {
  const { receiptId, username } = req.params

  const updatedReceipt = await receiptService.addContributor(
    receiptId,
    username
  )

  res.status(201).json(updatedReceipt)
}

export const handleRemoveContributor: RequestHandler = async (
  req,
  res,
  next
) => {
  const { receiptId, username } = req.params

  const updatedReceipt = await receiptService.removeContributor(
    receiptId,
    username
  )

  res.status(201).json(updatedReceipt)
}
