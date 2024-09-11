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
    throw new ErrorObject('Paragon nie istnieje', 404)
  }

  return receipt
}

export const createReceipt = async (
  receipt: ISimpleReceipt,
  userId: UserId
) => {
  const receiptObj = {
    ...receipt,
    products: receipt.products.map(product => ({
      ...product,
      discount: Math.abs(product.discount ?? 0),
      divisionType: 'shares',
      division: { [userId.toString()]: 1 },
    })),
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
    return
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
    if (!compareIds(product._id, productId)) {
      return product
    }

    const userIdString = userId.toString()
    const { division, divisionType } = product
    const currentUserDivision = division[userIdString]

    if (divisionType !== 'shares') {
      throw new ErrorObject(
        'Szybki podział jest dostępny tylko przy udziałach',
        400
      )
    }

    const updatedDivision = {
      ...division,
      [userIdString]: currentUserDivision === 1 ? null : 1,
    }

    return { ...product, division: updatedDivision }
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
    throw new ErrorObject('Tylko właściciel może dodawać użytkowników', 400)
  }

  const contributorAlreadyAdded = contributors.find(contributor =>
    compareIds(contributor, contributorId)
  )

  if (contributorAlreadyAdded) {
    throw new ErrorObject('Użytkownik został już dodany')
  }

  const updatedContributors = [...contributors, contributorId]
  const updatedProducts = receipt.products.map(product => {
    const { division } = product
    return {
      ...product,
      division: {
        ...division,
        [contributorId.toString()]: null,
      },
    }
  })

  return await Receipt.findByIdAndUpdate(
    receipt._id,
    { contributors: updatedContributors, products: updatedProducts },
    { new: true }
  )
}

export const removeContributor = async (
  receipt: IReceipt,
  contributorId: UserId
) => {
  if (compareIds(receipt.owner, contributorId)) {
    throw new ErrorObject('Nie można usunąć właściciela', 400)
  }

  const updatedContributors = receipt.contributors.filter(
    contributor => !compareIds(contributor, contributorId)
  )

  const updatedProducts = receipt.products.map(product => {
    const updatedDivision = { ...product.division }
    delete updatedDivision[contributorId.toString()]

    return { ...product, division: updatedDivision }
  })

  return await Receipt.findByIdAndUpdate(
    receipt._id,
    { contributors: updatedContributors, products: updatedProducts },
    { new: true }
  )
}

export const updateProduct = async (
  receipt: IReceipt,
  productId: ProductId,
  product: Omit<IProduct, '_id'>
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

export const removeProduct = async (
  receipt: IReceipt,
  productId: ProductId
) => {
  const updatedProducts = receipt.products.filter(
    product => !compareIds(product._id, productId)
  )

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
