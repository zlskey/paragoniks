import type { Receipt } from 'src/app/generic.types'
import type {
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
import { getRsApi } from '../../rs.api'

export async function getUserReceipts({}: GetUserReceiptsBody) {
  const url = '/receipt'
  const rsApi = await getRsApi()
  const response = await rsApi.get<Receipt[]>(url)

  return response.data
}

export async function createReceipt(body: CreateReceiptBody) {
  const url = '/receipt'
  const rsApi = await getRsApi()

  const response = await rsApi.post<Receipt>(url, body, { timeout: 100000 })

  return response.data
}

export async function getReceipt({ receiptId }: GetReceiptBody) {
  const url = `/receipt/${receiptId}`
  const rsApi = await getRsApi()
  const response = await rsApi.get<Receipt>(url)

  return response.data
}

export async function toggleProductComprising({
  receiptId,
  productId,
}: ToggleProductComprisingBody) {
  const url = `/receipt/${receiptId}/product/${productId}/comprising`
  const rsApi = await getRsApi()
  const response = await rsApi.patch<Receipt>(url)

  return response.data
}

export async function removeReceipt({ receiptId }: RemoveReceiptBody) {
  const url = `/receipt/${receiptId}`
  const rsApi = await getRsApi()
  const response = await rsApi.delete<Receipt[]>(url)

  return response.data
}

export async function changeReceiptTitle({
  receiptId,
  newTitle,
}: ChangeReceiptTitleBody) {
  const url = `/receipt/${receiptId}/title`
  const rsApi = await getRsApi()
  const response = await rsApi.patch<Receipt>(url, {
    newTitle,
  })

  return response.data
}

export async function addContributor({
  receiptId,
  contributorId,
}: AddContributorBody) {
  const url = `/receipt/${receiptId}/friend/${contributorId}`
  const rsApi = await getRsApi()
  const response = await rsApi.patch<Receipt>(url)

  return response.data
}

export async function removeContributor({
  receiptId,
  contributorId,
}: RemoveContributorBody) {
  const url = `/receipt/${receiptId}/friend/${contributorId}`
  const rsApi = await getRsApi()
  const response = await rsApi.delete<Receipt>(url)

  return response.data
}

export async function updateProduct({
  receiptId,
  productId,
  product,
}: UpdateProductBody) {
  const url = `/receipt/${receiptId}/product/${productId}`
  const rsApi = await getRsApi()
  const response = await rsApi.patch<Receipt>(url, { product })

  return response.data
}

export async function removeProduct({
  receiptId,
  productId,
}: RemoveProductBody) {
  const url = `/receipt/${receiptId}/product/${productId}`
  const rsApi = await getRsApi()
  const response = await rsApi.delete<Receipt>(url)

  return response.data
}
