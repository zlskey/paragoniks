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
          timeout: 20000,
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

export const receiptToggleItemComprising = createAsyncThunk(
  'receipt/toggleComprising',
  async (
    { receiptId, itemId }: { receiptId: string; itemId: string },
    { rejectWithValue }
  ) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.patch<Receipt>(
        `/receipt/${receiptId}/comprising/${itemId}`
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

interface ChangeReceiptTitleBody {
  receiptId: string
  newTitle: string
}

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

interface AddReceiptContributorBody {
  receiptId: string
  username: string
}

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

interface RemoveReceiptContributorBody extends AddReceiptContributorBody {}

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

interface UpdateReceiptItemBody {
  receiptId: string
  itemId: string
  item: {
    name: string
    value: number
    count: number
  }
}

export const updateReceiptItem = createAsyncThunk(
  'receipt/updateReceiptItem',
  async (
    { receiptId, itemId, item }: UpdateReceiptItemBody,
    { rejectWithValue }
  ) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.patch<Receipt>(
        `/receipt/${receiptId}/item/${itemId}`,
        { item }
      )

      return response.data
    })
)
