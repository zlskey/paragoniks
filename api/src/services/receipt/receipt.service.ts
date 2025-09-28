import type { IReceiptModel } from 'src/models/receipt.model'
import type { BaseProduct, Product, ProductId, Receipt, ReceiptId, UserId } from 'src/types'
import mongoose from 'mongoose'
import { ErrorObject } from 'src/middlewares/error.middleware'
import ReceiptModel from 'src/models/receipt.model'
import { ScanningStatus } from 'src/types'
import {
  getCalculatedTotalsForReceipt,
  getEvenDivision,
} from 'src/utils/calculators'
import { compareIds } from 'src/utils/ids-util'

export async function getAllReceipts(userId: UserId) {
  const receipts = await ReceiptModel.find({
    $or: [
      { owner: userId },
      { [`contributors.${userId.toString()}`]: { $exists: true } },
    ],
    isRemoved: false,
  })

  return receipts
}

export async function getReceipt(receiptId: ReceiptId) {
  const receipt = await ReceiptModel.findOne({ _id: receiptId })

  if (!receipt) {
    throw new ErrorObject('Paragon nie istnieje', 404)
  }

  if (receipt.isRemoved) {
    throw new ErrorObject('Paragon został usunięty', 404)
  }

  return receipt
}

type CreateReceiptToScanBean = Pick<Receipt, 'contributors' | 'imagePath'>

export async function createReceiptToScan(userId: UserId, receipt: CreateReceiptToScanBean) {
  const contributorsIds = Object.keys(receipt.contributors)
  return await ReceiptModel.create({
    sum: 0,
    title: 'x',
    products: [],
    owner: userId,
    scanning: { status: ScanningStatus.IN_PROGRESS },
    contributors: contributorsIds,
    ...receipt,
  })
}

interface FillScannedDataBean {
  products: BaseProduct[]
  title: string
}

export async function fillScannedData(receiptId: ReceiptId, scannedData: FillScannedDataBean) {
  const receipt = await getReceipt(receiptId)

  const products = scannedData.products.map(product => ({
    ...product,
    _id: new mongoose.Types.ObjectId(),
    discount: Math.abs(product.discount ?? 0),
    divisionType: 'shares',
    division: receipt.contributors,
  })) as Product[]

  const receiptUpdate = {
    scanning: { status: ScanningStatus.DONE },
    title: scannedData.title,
    ...getCalculatedTotalsForReceipt(Object.keys(receipt.contributors), products),
  }

  await ReceiptModel.findByIdAndUpdate(receiptId, receiptUpdate)
}

export async function handleFailedScanning(receiptId: ReceiptId, message: string) {
  await ReceiptModel.findByIdAndUpdate(receiptId, {
    scanning: { status: ScanningStatus.FAILED, errorMessage: message },
  })
}

type CreateReceiptBean = Pick<Receipt, 'title' | 'imagePath' | 'contributors'> & {
  products: BaseProduct[]
}

export async function createReceipt(userId: UserId, receipt: CreateReceiptBean) {
  const contributorsIds = Object.keys(receipt.contributors)
  const products = receipt.products.map(product => ({
    ...product,
    discount: Math.abs(product.discount ?? 0),
    divisionType: 'shares',
    division: receipt.contributors,
  })) as Product[]

  const receiptObj = {
    owner: userId,
    ...receipt,
    ...getCalculatedTotalsForReceipt(contributorsIds, products),
  }

  return await ReceiptModel.create(receiptObj)
}

export async function removeReceiptForUser(receipt: IReceiptModel, userId: UserId) {
  const isOwner = compareIds(receipt.owner, userId)

  if (!isOwner) {
    await removeContributor(receipt, userId)
    return
  }

  await ReceiptModel.findByIdAndUpdate(receipt._id, { isRemoved: true })
}

export async function changeReceiptTitle(receipt: IReceiptModel, newTitle: string) {
  return await ReceiptModel.findByIdAndUpdate(
    receipt._id,
    { title: newTitle },
    { new: true },
  )
}

export async function addContributor(receipt: IReceiptModel, userId: UserId, contributorId: UserId) {
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

  return await ReceiptModel.findByIdAndUpdate(
    receipt._id,
    { contributors, products: updatedProducts },
    { new: true },
  )
}

export async function removeContributor(receipt: IReceiptModel, contributorId: UserId) {
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

  return await ReceiptModel.findByIdAndUpdate(
    receipt._id,
    getCalculatedTotalsForReceipt(
      Object.keys(contributors),
      updatedProducts,
    ),
    { new: true },
  )
}

export async function updateProduct(receipt: IReceiptModel, productId: ProductId, product: Omit<Product, '_id'>) {
  const updatedProducts = receipt.products.map((receiptProduct) => {
    if (compareIds(receiptProduct._id, productId)) {
      return {
        ...receiptProduct,
        ...product,
      }
    }

    return receiptProduct
  })

  return await ReceiptModel.findByIdAndUpdate(
    receipt._id,
    getCalculatedTotalsForReceipt(
      Object.keys(receipt.contributors),
      updatedProducts,
    ),
    { new: true },
  )
}

export async function removeProduct(receipt: IReceiptModel, productId: ProductId) {
  const updatedProducts = receipt.products.filter(
    product => !compareIds(product._id, productId),
  )

  return await ReceiptModel.findByIdAndUpdate(
    receipt._id,
    { products: updatedProducts },
    { new: true },
  )
}

export async function removeUserFromAllReceipts(userToBeRemoved: UserId, ownerOfReceipts: UserId) {
  const receipts = await ReceiptModel.find({
    [`contributors.${userToBeRemoved}`]: { $exists: true },
    owner: ownerOfReceipts,
  })

  for (const receipt of receipts) {
    await removeContributor(receipt, userToBeRemoved)
  }
}
