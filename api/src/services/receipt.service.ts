import * as fs from 'fs'

import Receipt, { IReceipt, ISimpleReceipt } from 'src/models/receipt.model'

import { ErrorObject } from 'src/middlewares/error.middleware'
import { IUser } from 'src/models/User.model'

export const getAllReceipts = async (username: string) => {
  const receipts = await Receipt.find({
    $or: [{ owner: username }, { contributors: username }],
  })

  return receipts
}

export const getReceipt = async (receiptId: string) => {
  const receipt = await Receipt.findById(receiptId)

  if (!receipt) {
    throw new ErrorObject('Receipt not found', 404)
  }

  return receipt
}

export const createReceipt = async (receipt: ISimpleReceipt, user: IUser) => {
  const receiptObj = {
    ...receipt,
    owner: user.username,
    contributors: [],
  }

  return await Receipt.create(receiptObj)
}

export const removeReceiptForUser = async (receipt: IReceipt, user: IUser) => {
  const isContributor = receipt.contributors.includes(user.username)

  if (isContributor) {
    await removeContributor(receipt, user.username)
  }

  await Receipt.findByIdAndRemove(receipt._id)
  fs.rmSync(receipt.imagePath)
}

export const toggleComprising = async (
  receipt: IReceipt,
  productId: string,
  username: string
) => {
  const updatedProducts = receipt.products.map(product => {
    if (product._id === productId) {
      const comprising = product.comprising.includes(username)

      if (comprising) {
        product.comprising = product.comprising.filter(
          comprisingUsername => comprisingUsername !== username
        )
        return product
      }

      product.comprising.push(username)

      return product
    }

    return product
  })

  const updatedReceipt = await Receipt.findByIdAndUpdate(
    receipt._id,
    { products: updatedProducts },
    { new: true }
  )

  return updatedReceipt
}

export const changeReceiptTitle = async (
  receipt: IReceipt,
  newTitle: string
) => {
  return await Receipt.findByIdAndUpdate(
    receipt._id,
    { title: newTitle },
    { new: true }
  )
}

export const addContributor = async (receipt: IReceipt, username: string) => {
  const { contributors } = receipt

  if (contributors.includes(username)) {
    return receipt
  }

  const updatedContributors = [...contributors, username]

  return await Receipt.findByIdAndUpdate(
    receipt._id,
    { contributors: updatedContributors },
    { new: true }
  )
}

export const removeContributor = async (
  receipt: IReceipt,
  username: string
) => {
  const updatedContributors = receipt.contributors.filter(
    contributor => contributor !== username
  )

  const updatedProducts = receipt.products.map(product => ({
    ...product,
    comprising: product.comprising.filter(friend => friend !== username),
  }))

  return await Receipt.findByIdAndUpdate(
    receipt._id,
    { contributors: updatedContributors, products: updatedProducts },
    { new: true }
  )
}

export const updateProduct = async (
  receipt: IReceipt,
  productId: string,
  product: Record<string, string | number>
) => {
  const updatedProducts = receipt.products.map(receiptProduct => {
    if (receiptProduct._id === productId) {
      return {
        ...receiptProduct,
        ...product,
      }
    }

    return receiptProduct
  })

  return await Receipt.findByIdAndUpdate(
    receipt._id,
    { products: updatedProducts },
    { new: true }
  )
}
