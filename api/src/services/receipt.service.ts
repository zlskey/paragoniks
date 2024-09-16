import * as fs from 'fs'

import { ProductId, ReceiptId, UserId } from 'src/types/generic.types'
import Receipt, {
  IProduct,
  IReceipt,
  ISimpleReceipt,
} from 'src/models/receipt.model'
import {
  getCalculatedTotalsForReceipt,
  getEvenDivision,
} from 'src/utils/calculators'

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
  const products = receipt.products.map(product => ({
    ...product,
    discount: Math.abs(product.discount ?? 0),
    divisionType: 'shares',
    division: { [userId.toString()]: 1 },
  })) as IProduct[]

  const contributors = { [userId.toString()]: 1 }

  const receiptObj = {
    ...receipt,
    owner: userId,
    ...getCalculatedTotalsForReceipt({ contributors, products }),
  }

  return await Receipt.create(receiptObj)
}

export const removeReceiptForUser = async (
  receipt: IReceipt,
  userId: UserId
) => {
  const isOwner = compareIds(receipt.owner, userId)

  if (!isOwner) {
    await removeContributor(receipt, userId)
    return
  }

  await Receipt.findByIdAndRemove(receipt._id)

  fs.rmSync(receipt.imagePath)
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

  const contributorAlreadyAdded = contributors[contributorId.toString()]

  if (contributorAlreadyAdded) {
    throw new ErrorObject('Użytkownik został już dodany')
  }

  contributors[contributorId.toString()] = 0

  const updatedProducts = receipt.products.map(({ division, ...product }) => {
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
    { contributors, products: updatedProducts },
    { new: true }
  )
}

export const removeContributor = async (
  receipt: IReceipt,
  contributorId: UserId
) => {
  const contributors = receipt.contributors
  if (compareIds(receipt.owner, contributorId)) {
    throw new ErrorObject('Nie można usunąć właściciela', 400)
  }

  delete contributors[contributorId.toString()]

  const updatedProducts = receipt.products.map(product => {
    const { divisionType, totalPrice } = product
    const divisionCopy = { ...product.division }
    const userDivision = divisionCopy[contributorId.toString()]
    delete divisionCopy[contributorId.toString()]

    if (userDivision === null || divisionType === 'shares') {
      return { ...product, division: divisionCopy }
    }

    return {
      ...product,
      division: getEvenDivision({
        division: divisionCopy,
        divisionType: divisionType,
        totalPrice: totalPrice,
      }),
    }
  })

  return await Receipt.findByIdAndUpdate(
    receipt._id,
    getCalculatedTotalsForReceipt({ contributors, products: updatedProducts }),
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
    getCalculatedTotalsForReceipt({
      contributors: receipt.contributors,
      products: updatedProducts,
    }),
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
