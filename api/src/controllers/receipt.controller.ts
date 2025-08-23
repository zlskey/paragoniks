import type { RequestHandler } from 'express'
import type { ProductId, UserId } from 'src/types'
import type { HandleCreateReceiptBean } from './receipt.controller.beans'
import config from 'src/config'
import { ErrorObject } from 'src/middlewares/error.middleware'
import { receiptService, scanCountService } from 'src/services'
import { uploadReceiptImage } from 'src/utils/gcp/bucket'
import { getCompressedImageBufferFromBase64 } from 'src/utils/image.utils'
import { extractReceiptDataFromText, generateReceiptTitle } from 'src/utils/openai'

export const handleGetUserReceipts: RequestHandler = async (req, res) => {
  const user = req.user

  const receipts = await receiptService.getAllReceipts(user._id)

  res.status(200).json(receipts)
}

export const handleCreateReceipt: RequestHandler = async (req, res) => {
  const user = req.user
  const receipt = req.body as HandleCreateReceiptBean

  await user.incrementReceiptCount()

  const compressedImageBuffer = await getCompressedImageBufferFromBase64(receipt.image)
  const imagePath = await uploadReceiptImage(user._id.toString(), compressedImageBuffer)

  const { contributors } = receipt

  if (receipt.shouldGenerateProducts) {
    const receiptRecord = await receiptService.createReceiptToScan(user._id, { imagePath, contributors })

    res.status(201).json(receiptRecord)

    try {
      const scanCount = await scanCountService.getOrCreateScanCount(user._id)
      if (scanCount.count >= config.MAX_SCAN_COUNT) {
        throw new ErrorObject('Przekroczono limit zeskanowanych paragonów', 400)
      }
      await scanCount.incrementCount()
      await user.incrementScanCount()
      const receiptData = await extractReceiptDataFromText(receipt.image)
      await receiptService.fillScannedData(receiptRecord._id, receiptData)
    }
    catch (err) {
      console.error(err)
      await receiptService.handleFailedScanning(
        receiptRecord._id,
        err instanceof ErrorObject ? err.message : 'Nie udało się przetworzyć paragonu',
      )
    }
    return
  }

  const shouldGenerateTitle = !!receipt.shouldGenerateTitle
  const generatedTitle = shouldGenerateTitle ? await generateReceiptTitle(receipt.products) : null
  const title = generatedTitle ?? receipt.title

  const receiptRecord = await receiptService.createReceipt(user._id, {
    title,
    imagePath,
    contributors,
    products: receipt.products,
  })

  res.status(201).json(receiptRecord)
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
