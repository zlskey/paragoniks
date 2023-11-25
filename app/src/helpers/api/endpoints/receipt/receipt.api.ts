import {
  AddContributorBody,
  ChangeReceiptTitleBody,
  CreateReceiptBody,
  GetContributorsBody,
  GetReceiptBody,
  GetUserReceiptsBody,
  RemoveContributorBody,
  RemoveReceiptBody,
  ToggleProductComprisingBody,
  UpdateProductBody,
} from './receipt.api.types'
import { Profile, Receipt } from 'src/types/generic.types'

import { rsApi } from '../../rs.api'

export const getUserReceipts = async ({}: GetUserReceiptsBody) => {
  const url = '/receipt'
  const response = await rsApi.get<Receipt[]>(url)

  return response.data
}

export const createReceipt = async ({ image }: CreateReceiptBody) => {
  const url = '/receipt'
  const response = await rsApi.post<Receipt>(
    url,
    { image },
    {
      timeout: 30000,
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )

  return response.data
}

export const getReceipt = async ({ receiptId }: GetReceiptBody) => {
  const url = `/receipt/${receiptId}`
  const response = await rsApi.get<Receipt>(url)

  return response.data
}

export const toggleProductComprising = async ({
  receiptId,
  productId,
  userId,
}: ToggleProductComprisingBody) => {
  const url = `/receipt/${receiptId}/product/${productId}/comprising`
  const response = await rsApi.patch<Receipt>(url, { userId })

  return response.data
}

export const removeReceipt = async ({ receiptId }: RemoveReceiptBody) => {
  const url = `/receipt/${receiptId}`
  const response = await rsApi.delete<Receipt[]>(url)

  return response.data
}

export const changeReceiptTitle = async ({
  receiptId,
  newTitle,
}: ChangeReceiptTitleBody) => {
  const url = `/receipt/${receiptId}/title`
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
  const response = await rsApi.patch<Receipt>(url)

  return response.data
}

export const removeContributor = async ({
  receiptId,
  contributorId,
}: RemoveContributorBody) => {
  const url = `/receipt/${receiptId}/friend/${contributorId}`
  const response = await rsApi.delete<Receipt>(url)

  return response.data
}

export const updateProduct = async ({
  receiptId,
  productId,
  product,
}: UpdateProductBody) => {
  const url = `/receipt/${receiptId}/product/${productId}`
  const response = await rsApi.patch<Receipt>(url, { product })

  return response.data
}

export const getContributors = async ({ receiptId }: GetContributorsBody) => {
  const url = `/receipt/${receiptId}/contributors`
  const response = await rsApi.get<Profile[]>(url)

  return response.data
}
