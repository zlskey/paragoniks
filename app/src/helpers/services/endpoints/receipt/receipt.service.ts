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
} from './receipt.service.types'
import { Profile, Receipt } from 'src/types/generic.types'

import { rsApi } from '../../rs.service'

export const getUserReceipts = async ({}: GetUserReceiptsBody) => {
  const response = await rsApi.get<Receipt[]>('/receipt')

  return response.data
}

export const createReceipt = async ({ image }: CreateReceiptBody) => {
  const response = await rsApi.post<Receipt>(
    '/receipt',
    { image },
    {
      timeout: 30000,
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )

  return response.data
}

export const getReceipt = async ({ receiptId }: GetReceiptBody) => {
  const response = await rsApi.get<Receipt>(`/receipt/${receiptId}`)

  return response.data
}

export const toggleProductComprising = async ({
  receiptId,
  productId,
}: ToggleProductComprisingBody) => {
  const response = await rsApi.patch<Receipt>(
    `/receipt/${receiptId}/product/${productId}/comprising`
  )

  return response.data
}

export const removeReceipt = async ({ receiptId }: RemoveReceiptBody) => {
  const response = await rsApi.delete<Receipt[]>(`/receipt/${receiptId}`)

  return response.data
}

export const changeReceiptTitle = async ({
  receiptId,
  newTitle,
}: ChangeReceiptTitleBody) => {
  const response = await rsApi.patch<Receipt>(`/receipt/${receiptId}/title`, {
    newTitle,
  })

  return response.data
}

export const addContributor = async ({
  receiptId,
  contributorId,
}: AddContributorBody) => {
  const response = await rsApi.patch<Receipt>(
    `/receipt/${receiptId}/friend/${contributorId}`
  )

  return response.data
}

export const removeContributor = async ({
  receiptId,
  contributorId,
}: RemoveContributorBody) => {
  const response = await rsApi.delete<Receipt>(
    `/receipt/${receiptId}/friend/${contributorId}`
  )

  return response.data
}

export const updateProduct = async ({
  receiptId,
  productId,
  product,
}: UpdateProductBody) => {
  const response = await rsApi.patch<Receipt>(
    `/receipt/${receiptId}/product/${productId}`,
    { product }
  )

  return response.data
}

export const getContributors = async ({ receiptId }: GetContributorsBody) => {
  const response = await rsApi.get<Profile[]>(
    `/receipt/${receiptId}/contributors`
  )

  return response.data
}
