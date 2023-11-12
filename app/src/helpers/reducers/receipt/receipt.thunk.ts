import {
  AddContributorBody,
  ChangeReceiptTitleBody,
  CreateReceiptBody,
  GetReceiptBody,
  RemoveContributorBody,
  RemoveReceiptBody,
  ToggleProductComprisingBody,
  UpdateProductBody,
} from 'src/helpers/services/endpoints/receipt/receipt.service.types'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { receiptService } from 'src/helpers/services'
import { wrapThunk } from 'src/helpers/utils/wrap-thunk'

export const getUserReceipts = createAsyncThunk(
  'receipt/getUserReceipts',
  async (_, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return receiptService.getUserReceipts({})
    })
)

export const createReceipt = createAsyncThunk(
  'receipt/createReceipt',
  async (body: CreateReceiptBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return receiptService.createReceipt(body)
    })
)

export const getReceipt = createAsyncThunk(
  'receipt/getReceipt',
  async (body: GetReceiptBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return receiptService.getReceipt(body)
    })
)

export const toggleProductComprising = createAsyncThunk(
  'receipt/toggleProductComprising',
  async (body: ToggleProductComprisingBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return receiptService.toggleProductComprising(body)
    })
)

export const removeReceipt = createAsyncThunk(
  'receipt/removeReceipt',
  async (body: RemoveReceiptBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return receiptService.removeReceipt(body)
    })
)

export const changeReceiptTitle = createAsyncThunk(
  'receipt/changeReceiptTitle',
  async (body: ChangeReceiptTitleBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return receiptService.changeReceiptTitle(body)
    })
)

export const addContributor = createAsyncThunk(
  'receipt/addContributor',
  async (body: AddContributorBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return receiptService.addContributor(body)
    })
)

export const removeContributor = createAsyncThunk(
  'receipt/removeContributor',
  async (body: RemoveContributorBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return receiptService.removeContributor(body)
    })
)

export const updateProduct = createAsyncThunk(
  'receipt/updateProduct',
  async (body: UpdateProductBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return receiptService.updateProduct(body)
    })
)
