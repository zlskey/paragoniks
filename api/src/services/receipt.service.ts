import * as fs from 'fs'

import Receipt, { IReceipt, ISimpleReceipt } from 'src/models/receipt.model'

import { ErrorObject } from 'src/middlewares/error.middleware'
import { IUser } from 'src/models/User.model'

export const getAllReceipts = async (username: string) => {
  const receipts = await Receipt.find({
    $or: [{ owner: username }, { others: username }],
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
    others: [],
  }

  return await Receipt.create(receiptObj)
}

export const removeReceiptForUser = async (
  receiptId: IReceipt['_id'],
  user: IUser
) => {
  const receipt = await getReceipt(receiptId)

  const isOwner = user.username === receipt.owner

  const isContributor = receipt.others.includes(user.username)

  if (isOwner) {
    await Receipt.findByIdAndRemove(receiptId)
    fs.rmSync(receipt.imagePath)
    return
  }

  if (isContributor) {
    await removeContributor(receiptId, user.username)
    return
  }

  throw new ErrorObject(
    'You are not a contributor nor an owner of this receipt',
    403
  )
}

export const toggleComprising = async (
  receiptId: string,
  productId: string,
  username: string
) => {
  const receipt = await getReceipt(receiptId)

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
    receiptId,
    { products: updatedProducts },
    { new: true }
  )

  return updatedReceipt
}

export const changeReceiptTitle = async (
  receiptId: string,
  newTitle: string
) => {
  const receipt = await getReceipt(receiptId)

  return await Receipt.findByIdAndUpdate(
    receipt._id,
    { title: newTitle },
    { new: true }
  )
}

export const addContributor = async (receiptId: string, username: string) => {
  const receipt = await getReceipt(receiptId)

  const { others } = receipt

  if (others.includes(username)) {
    return receipt
  }

  const updatedOthers = [...others, username]

  return await Receipt.findByIdAndUpdate(
    receipt._id,
    { others: updatedOthers },
    { new: true }
  )
}

export const removeContributor = async (
  receiptId: string,
  username: string
) => {
  const receipt = await getReceipt(receiptId)

  const updatedOthers = receipt.others.filter(
    contributor => contributor !== username
  )

  const updatedProducts = receipt.products.map(product => ({
    ...product,
    comprising: product.comprising.filter(friend => friend !== username),
  }))

  return await Receipt.findByIdAndUpdate(
    receipt._id,
    { others: updatedOthers, products: updatedProducts },
    { new: true }
  )
}

export const updateProduct = async (
  receiptId: string,
  productId: string,
  product: Record<string, string | number>
) => {
  const receipt = await getReceipt(receiptId)

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
