import { Receipt, RsApiError } from 'src/types/generic.types'
import {
  addReceiptContributor,
  changeReceiptTitle,
  createNewReceipt,
  getSingleReceipt,
  getUserReceipts,
  receiptToggleItemComprising,
  removeReceipt,
  removeReceiptContributor,
} from './receipt.thunk'

import { RootState } from 'src/redux-store'
import { createSlice } from '@reduxjs/toolkit'

interface ReceiptState {
  items: Receipt[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: RsApiError['message'] | null
}

const initialState: ReceiptState = {
  items: [],
  loading: 'idle',
  error: null,
}

const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserReceipts.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(getUserReceipts.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.items = action.payload
      })
      .addCase(getUserReceipts.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })

    builder
      .addCase(createNewReceipt.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(createNewReceipt.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.items = action.payload
      })
      .addCase(createNewReceipt.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })

    builder
      .addCase(getSingleReceipt.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(getSingleReceipt.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.items = addOrChangeReceipt(state.items, action.payload)
      })
      .addCase(getSingleReceipt.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })

    builder
      .addCase(receiptToggleItemComprising.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(receiptToggleItemComprising.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.items = addOrChangeReceipt(state.items, action.payload)
      })
      .addCase(receiptToggleItemComprising.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })

    builder
      .addCase(removeReceipt.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(removeReceipt.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.items = action.payload
      })
      .addCase(removeReceipt.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })

    builder
      .addCase(changeReceiptTitle.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(changeReceiptTitle.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.items = addOrChangeReceipt(state.items, action.payload)
      })
      .addCase(changeReceiptTitle.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })

    builder
      .addCase(addReceiptContributor.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(addReceiptContributor.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.items = addOrChangeReceipt(state.items, action.payload)
      })
      .addCase(addReceiptContributor.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })

    builder
      .addCase(removeReceiptContributor.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(removeReceiptContributor.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.items = addOrChangeReceipt(state.items, action.payload)
      })
      .addCase(removeReceiptContributor.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
  },
})

const addOrChangeReceipt = (list: Receipt[], item: Receipt) => {
  const index = list.findIndex(el => el._id === item._id)

  if (index === -1) {
    return [...list, item]
  }

  list[index] = item

  return list
}

export const selectAllReceipts = (state: RootState) => state.receipt.items

export const selectSingleReceipt = (receiptId: string) => (state: RootState) =>
  state.receipt.items.find(receipt => receipt._id === receiptId)

export const selectReceiptLoading = (state: RootState) => state.receipt.loading

export const selectReceiptError = (state: RootState) => state.receipt.error

export const { clearError } = receiptSlice.actions

export default receiptSlice.reducer
