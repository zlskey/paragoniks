import * as fs from 'fs'

import { ProductId, ReceiptId, UserId } from 'src/types/generic.types'
import Receipt, {
  IProduct,
  IReceipt,
  ISimpleReceipt,
} from 'src/models/receipt.model'

import { ErrorObject } from 'src/middlewares/error.middleware'
import { compareIds } from 'src/utils/ids-util'

export const getAllReceipts = async (userId: UserId) => {
  const receipts = await Receipt.find({
    $or: [{ owner: userId }, { contributors: userId.toString() }],
  })

  return receipts
}

export const getReceipt = async (receiptId: ReceiptId) => {
  const receipt = await Receipt.findById(receiptId)

  if (!receipt) {
    throw new ErrorObject('Receipt not found', 404)
  }

  return receipt
}

export const createReceipt = async (
  receipt: ISimpleReceipt,
  userId: UserId
) => {
  const receiptObj = {
    ...receipt,
    owner: userId,
    contributors: [],
  }

  return await Receipt.create(receiptObj)
}

export const removeReceiptForUser = async (
  receipt: IReceipt,
  userId: UserId
) => {
  const isContributor = receipt.contributors.includes(userId)

  if (isContributor) {
    await removeContributor(receipt, userId)
  }

  await Receipt.findByIdAndRemove(receipt._id)

  fs.rmSync(receipt.imagePath)
}

export const toggleComprising = async (
  receipt: IReceipt,
  productId: ProductId,
  userId: UserId
) => {
  const updatedProducts = receipt.products.map(product => {
    if (compareIds(product._id, productId)) {
      const comprising = product.comprising.find(comprising =>
        compareIds(comprising, userId)
      )

      if (comprising) {
        product.comprising = product.comprising.filter(
          comprisingId => !compareIds(comprisingId, userId)
        )
        return product
      }

      product.comprising.push(userId)

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

export const addContributor = async (
  receipt: IReceipt,
  userId: UserId,
  contributorId: UserId
) => {
  const { contributors } = receipt

  if (!compareIds(receipt.owner, userId)) {
    throw new ErrorObject('Only owner can add contributors', 400)
  }

  if (
    contributors.find(contributor => compareIds(contributor, contributorId))
  ) {
    return receipt
  }

  const updatedContributors = [...contributors, contributorId]

  return await Receipt.findByIdAndUpdate(
    receipt._id,
    { contributors: updatedContributors },
    { new: true }
  )
}

export const removeContributor = async (
  receipt: IReceipt,
  contributorId: UserId
) => {
  if (compareIds(receipt.owner, contributorId)) {
    throw new ErrorObject('Cannot remove owner', 400)
  }

  const updatedContributors = receipt.contributors.filter(
    contributor => !compareIds(contributor, contributorId)
  )

  const updatedProducts = receipt.products.map(product => ({
    ...product,
    comprising: product.comprising.filter(
      friend => !compareIds(friend, contributorId)
    ),
  }))

  return await Receipt.findByIdAndUpdate(
    receipt._id,
    { contributors: updatedContributors, products: updatedProducts },
    { new: true }
  )
}

export const updateProduct = async (
  receipt: IReceipt,
  productId: ProductId,
  product: Pick<IProduct, 'name' | 'count' | 'price' | 'comprising'>
) => {
  const updatedProducts = receipt.products.map(receiptProduct => {
    if (compareIds(receiptProduct._id, productId)) {
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

export const getContributors = (receipt: IReceipt) => {
  const contributors = receipt.contributors.concat(receipt.owner)

  return contributors
}
