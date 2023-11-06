import {
  AddReceiptContributorBody,
  ChangeReceiptTitleBody,
  ReceiptToggleProductComprisingBody,
  RemoveReceiptContributorBody,
  UpdateReceiptProductBody,
} from './receipt.types'

import { Receipt } from 'src/types/generic.types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { rsApi } from 'src/helpers/services/rs.service'
import { wrapThunk } from 'src/helpers/utils/wrap-thunk'

export const getUserReceipts = createAsyncThunk(
  'receipt/getUserReceipts',
  async (_, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.get<Receipt[]>('/receipt')

      return response.data
    })
)

export const createNewReceipt = createAsyncThunk(
  'receipt/createNewReceipt',
  async (image: File, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.post<Receipt[]>(
        '/receipt',
        { image },
        {
          timeout: 30000,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      return response.data
    })
)

export const getSingleReceipt = createAsyncThunk(
  'receipt/getSingleReceipt',
  async (receiptId: string, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.get<Receipt>(`/receipt/${receiptId}`)

      return response.data
    })
)

export const receiptToggleProductComprising = createAsyncThunk(
  'receipt/toggleComprising',
  async (
    { receiptId, productId }: ReceiptToggleProductComprisingBody,
    { rejectWithValue }
  ) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.patch<Receipt>(
        `/receipt/${receiptId}/comprising/${productId}`
      )

      return response.data
    })
)

export const removeReceipt = createAsyncThunk(
  'receipt/removeReceipt',
  async (receiptId: string, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.delete<Receipt[]>(`/receipt/${receiptId}`)

      return response.data
    })
)

export const changeReceiptTitle = createAsyncThunk(
  'receipt/changeReceiptTitle',
  async (
    { receiptId, newTitle }: ChangeReceiptTitleBody,
    { rejectWithValue }
  ) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.patch<Receipt>(
        `/receipt/${receiptId}/title`,
        { newTitle }
      )

      return response.data
    })
)

export const addReceiptContributor = createAsyncThunk(
  'receipt/handleAddFriend',
  async (
    { receiptId, username }: AddReceiptContributorBody,
    { rejectWithValue }
  ) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.patch<Receipt>(
        `/receipt/${receiptId}/friend/${username}`
      )

      return response.data
    })
)

export const removeReceiptContributor = createAsyncThunk(
  'receipt/removeReceiptContributor',
  async (
    { receiptId, username }: RemoveReceiptContributorBody,
    { rejectWithValue }
  ) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.delete<Receipt>(
        `/receipt/${receiptId}/friend/${username}`
      )

      return response.data
    })
)

export const updateReceiptProduct = createAsyncThunk(
  'receipt/updateReceiptProduct',
  async (
    { receiptId, productId, product }: UpdateReceiptProductBody,
    { rejectWithValue }
  ) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.patch<Receipt>(
        `/receipt/${receiptId}/product/${productId}`,
        { product }
      )

      return response.data
    })
)
