import {
  AddContributorBody,
  ChangeReceiptTitleBody,
  CreateReceiptBody,
  GetReceiptBody,
  GetUserReceiptsBody,
  RemoveContributorBody,
  RemoveProductBody,
  RemoveReceiptBody,
  ToggleProductComprisingBody,
  UpdateProductBody,
} from './receipt.api.types'

import { Receipt } from 'src/app/generic.types'
import { getRsApi } from '../../rs.api'

export const getUserReceipts = async ({}: GetUserReceiptsBody) => {
  const url = '/receipt'
  const rsApi = await getRsApi()
  const response = await rsApi.get<Receipt[]>(url)

  return response.data
}

export const createReceipt = async ({ image }: CreateReceiptBody) => {
  const url = '/receipt/base64'
  const rsApi = await getRsApi()
  const response = await rsApi.post<Receipt>(url, { image }, { timeout: 30000 })

  return response.data
}

export const getReceipt = async ({ receiptId }: GetReceiptBody) => {
  const url = `/receipt/${receiptId}`
  const rsApi = await getRsApi()
  const response = await rsApi.get<Receipt>(url)

  return response.data
}

export const toggleProductComprising = async ({
  receiptId,
  productId,
}: ToggleProductComprisingBody) => {
  const url = `/receipt/${receiptId}/product/${productId}/comprising`
  const rsApi = await getRsApi()
  const response = await rsApi.patch<Receipt>(url)

  return response.data
}

export const removeReceipt = async ({ receiptId }: RemoveReceiptBody) => {
  const url = `/receipt/${receiptId}`
  const rsApi = await getRsApi()
  const response = await rsApi.delete<Receipt[]>(url)

  return response.data
}

export const changeReceiptTitle = async ({
  receiptId,
  newTitle,
}: ChangeReceiptTitleBody) => {
  const url = `/receipt/${receiptId}/title`
  const rsApi = await getRsApi()
  const response = await rsApi.patch<Receipt>(url, {
    newTitle,
  })

  return response.data
}

export const addContributor = async ({
  receiptId,
  contributorId,
}: AddContributorBody) => {
  const url = `/receipt/${receiptId}/friend/${contributorId}`
  const rsApi = await getRsApi()
  const response = await rsApi.patch<Receipt>(url)

  return response.data
}

export const removeContributor = async ({
  receiptId,
  contributorId,
}: RemoveContributorBody) => {
  const url = `/receipt/${receiptId}/friend/${contributorId}`
  const rsApi = await getRsApi()
  const response = await rsApi.delete<Receipt>(url)

  return response.data
}

export const updateProduct = async ({
  receiptId,
  productId,
  product,
}: UpdateProductBody) => {
  const url = `/receipt/${receiptId}/product/${productId}`
  const rsApi = await getRsApi()
  const response = await rsApi.patch<Receipt>(url, { product })

  return response.data
}

export const removeProduct = async ({
  receiptId,
  productId,
}: RemoveProductBody) => {
  const url = `/receipt/${receiptId}/product/${productId}`
  const rsApi = await getRsApi()
  const response = await rsApi.delete<Receipt>(url)

  return response.data
}
