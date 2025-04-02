import type { RequestHandler } from 'express'

import type { ISimpleReceipt } from 'src/models/receipt.model'
import type { ProductId, UserId } from 'src/types/generic.types'
import { writeFileSync } from 'node:fs'
import { receiptService } from 'src/services'
import { createReceipt } from 'src/services/receipt.service'
import { extractReceiptDataFromText } from 'src/utils/extract-receipt-data-from-text'

export const handleGetUserReceipts: RequestHandler = async (req, res) => {
  const user = req.user

  const receipts = await receiptService.getAllReceipts(user._id)

  res.status(200).json(receipts)
}

export const handleCreateReceiptFromImage: RequestHandler = async (req, res) => {
  const user = req.user
  const imageBase64 = req.body.image as string

  const receiptImage = Buffer.from(imageBase64, 'base64')
  const receiptImageUint8Array = new Uint8Array(receiptImage.buffer, receiptImage.byteOffset, receiptImage.byteLength)
  const imagePath = `./uploads/${user._id}_${new Date().getTime()}.png`
  writeFileSync(imagePath, receiptImageUint8Array)

  const receipt = await extractReceiptDataFromText(imageBase64)

  const receiptObj = await receiptService.createReceipt(
    { ...receipt, imagePath },
    user._id,
  )

  res.status(201).json(receiptObj)
}

export const handleCreateReceiptFromData: RequestHandler = async (req, res) => {
  const user = req.user
  const receiptBody = req.body as Pick<ISimpleReceipt, 'products' | 'title'>

  const receipt = await createReceipt({ ...receiptBody, imagePath: '' }, user._id)

  res.status(201).json(receipt)
}

export const handleGetSingleReceipt: RequestHandler = async (req, res) => {
  res.status(200).json(req.receipt)
}

export const handleRemoveReceipt: RequestHandler = async (req, res) => {
  const receipt = req.receipt
  const user = req.user

  await receiptService.removeReceiptForUser(receipt, user._id)

  const receipts = await receiptService.getAllReceipts(user._id)

  res.status(200).json(receipts)
}

export const handleChangeReceiptTitle: RequestHandler = async (req, res) => {
  const receipt = req.receipt
  const { newTitle } = req.body

  const updatedReceipt = await receiptService.changeReceiptTitle(
    receipt,
    newTitle,
  )

  res.status(200).json(updatedReceipt)
}

export const handleAddContributor: RequestHandler = async (req, res) => {
  const receipt = req.receipt
  const user = req.user
  const { contributorId } = req.params

  const updatedReceipt = await receiptService.addContributor(
    receipt,
    user._id,
    contributorId as unknown as UserId,
  )

  res.status(201).json(updatedReceipt)
}

export const handleRemoveContributor: RequestHandler = async (req, res) => {
  const receipt = req.receipt
  const { contributorId } = req.params

  const updatedReceipt = await receiptService.removeContributor(
    receipt,
    contributorId as unknown as UserId,
  )

  res.status(201).json(updatedReceipt)
}

export const handleUpdateProduct: RequestHandler = async (req, res) => {
  const receipt = req.receipt
  const { productId } = req.params
  const { product } = req.body

  const updatedReceipt = await receiptService.updateProduct(
    receipt,
    productId as unknown as ProductId,
    product,
  )

  res.status(201).json(updatedReceipt)
}

export const handleRemoveProduct: RequestHandler = async (req, res) => {
  const receipt = req.receipt
  const { productId } = req.params

  const updatedReceipt = await receiptService.removeProduct(
    receipt,
    productId as unknown as ProductId,
  )

  res.status(201).json(updatedReceipt)
}
