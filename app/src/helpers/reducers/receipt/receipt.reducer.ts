import {
  ActionReducerMapBuilder,
  AsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import { Receipt, RsApiError } from 'src/types/generic.types'
import {
  addContributor,
  changeReceiptTitle,
  createReceipt,
  getReceipt,
  getUserReceipts,
  removeContributor,
  removeReceipt,
  toggleProductComprising,
  updateProduct,
} from './receipt.thunk'

import { RootState } from 'src/redux-store'

interface ReceiptState {
  products: Receipt[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: RsApiError['message'] | null
}

const initialState: ReceiptState = {
  products: [],
  loading: 'idle',
  error: null,
}

const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
      state.loading = 'idle'
    },
  },
  extraReducers: builder => {
    addBuilderCase(builder, getUserReceipts)
    addBuilderCase(builder, createReceipt)
    addBuilderCase(builder, getReceipt)
    addBuilderCase(builder, toggleProductComprising)
    addBuilderCase(builder, removeReceipt)
    addBuilderCase(builder, changeReceiptTitle)
    addBuilderCase(builder, addContributor)
    addBuilderCase(builder, removeContributor)
    addBuilderCase(builder, updateProduct)
  },
})

const addBuilderCase = (
  builder: ActionReducerMapBuilder<ReceiptState>,
  asyncThunk: AsyncThunk<any, any, any>
) => {
  return builder
    .addCase(asyncThunk.pending, state => {
      state.loading = 'pending'
      state.error = null
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.error = null

      const payload = action.payload as Receipt | Receipt[]

      if (Array.isArray(payload)) {
        state.products = payload
        return
      }

      state.products = addOrChangeReceipt(state.products, payload)
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.payload as string
    })
}

const addOrChangeReceipt = (list: Receipt[], product: Receipt) => {
  const index = list.findIndex(el => el._id === product._id)

  if (index === -1) {
    return [...list, product]
  }

  list[index] = product

  return list
}

export const selectAllReceipts = (state: RootState) => state.receipt.products

export const selectSingleReceipt = (receiptId: string) => (state: RootState) =>
  state.receipt.products.find(receipt => receipt._id === receiptId)

export const selectReceiptLoading = (state: RootState) => state.receipt.loading

export const selectReceiptError = (state: RootState) => state.receipt.error

export const { clearError: clearReceiptError } = receiptSlice.actions

export default receiptSlice.reducer
