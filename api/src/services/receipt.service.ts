import type {
  IProduct,
  IReceipt,
  ISimpleReceipt,
} from 'src/models/receipt.model'

import type { ProductId, ReceiptId, UserId } from 'src/types/generic.types'
import * as fs from 'node:fs'
import { ErrorObject } from 'src/middlewares/error.middleware'
import Receipt from 'src/models/receipt.model'

import {
  getCalculatedTotalsForReceipt,
  getEvenDivision,
} from 'src/utils/calculators'
import { compareIds } from 'src/utils/ids-util'

export async function getAllReceipts(userId: UserId) {
  const receipts = await Receipt.find({
    $or: [
      { owner: userId },
      { [`contributors.${userId.toString()}`]: { $exists: true } },
    ],
  })

  return receipts
}

export async function getReceipt(receiptId: ReceiptId) {
  const receipt = await Receipt.findById(receiptId)

  if (!receipt) {
    throw new ErrorObject('Paragon nie istnieje', 404)
  }

  return receipt
}

export async function createReceipt(userId: UserId, receipt: Pick<ISimpleReceipt, 'products' | 'title' | 'imagePath' | 'contributors'>) {
  const contributorsIds = Object.keys(receipt.contributors)
  const products = receipt.products.map(product => ({
    ...product,
    discount: Math.abs(product.discount ?? 0),
    divisionType: 'shares',
    division: receipt.contributors,
  })) as IProduct[]

  const receiptObj = {
    owner: userId,
    ...receipt,
    ...getCalculatedTotalsForReceipt(contributorsIds, products),
  }

  return await Receipt.create(receiptObj)
}

export async function removeReceiptForUser(receipt: IReceipt, userId: UserId) {
  const isOwner = compareIds(receipt.owner, userId)

  if (!isOwner) {
    await removeContributor(receipt, userId)
    return
  }

  await Receipt.findByIdAndRemove(receipt._id)

  if (receipt.imagePath !== '') {
    fs.rmSync(receipt.imagePath)
  }
}

export async function changeReceiptTitle(receipt: IReceipt, newTitle: string) {
  return await Receipt.findByIdAndUpdate(
    receipt._id,
    { title: newTitle },
    { new: true },
  )
}

export async function addContributor(receipt: IReceipt, userId: UserId, contributorId: UserId) {
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
    { new: true },
  )
}

export async function removeContributor(receipt: IReceipt, contributorId: UserId) {
  const contributors = receipt.contributors
  if (compareIds(receipt.owner, contributorId)) {
    throw new ErrorObject('Nie można usunąć właściciela', 400)
  }

  delete contributors[contributorId.toString()]

  const updatedProducts = receipt.products.map((product) => {
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
        divisionType,
        totalPrice,
      }),
    }
  })

  return await Receipt.findByIdAndUpdate(
    receipt._id,
    getCalculatedTotalsForReceipt(
      Object.keys(contributors),
      updatedProducts,
    ),
    { new: true },
  )
}

export async function updateProduct(receipt: IReceipt, productId: ProductId, product: Omit<IProduct, '_id'>) {
  const updatedProducts = receipt.products.map((receiptProduct) => {
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
    getCalculatedTotalsForReceipt(
      Object.keys(receipt.contributors),
      updatedProducts,
    ),
    { new: true },
  )
}

export async function removeProduct(receipt: IReceipt, productId: ProductId) {
  const updatedProducts = receipt.products.filter(
    product => !compareIds(product._id, productId),
  )

  return await Receipt.findByIdAndUpdate(
    receipt._id,
    { products: updatedProducts },
    { new: true },
  )
}

export async function removeUserFromAllReceipts(userToBeRemoved: UserId, ownerOfReceipts: UserId) {
  const receipts = await Receipt.find({
    [`contributors.${userToBeRemoved}`]: { $exists: true },
    owner: ownerOfReceipts,
  })

  for (const receipt of receipts) {
    await removeContributor(receipt, userToBeRemoved)
  }
}
