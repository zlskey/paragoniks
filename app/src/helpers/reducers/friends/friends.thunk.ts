import {
  GetAllFriendshipsBody,
  RemoveFriendBody,
  RespondToFriendRequestBody,
  SendFriendRequestBody,
} from 'src/helpers/services/endpoints/friends/friends.service.types'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { friendsService } from 'src/helpers/services'
import { wrapThunk } from 'src/helpers/utils/wrap-thunk'

export const getAllFriendships = createAsyncThunk(
  'friends/getAllFriendships',
  async (body: GetAllFriendshipsBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return friendsService.getAllFriendships(body)
    })
)

export const sendFriendRequest = createAsyncThunk(
  'friends/sendFriendRequest',
  async (body: SendFriendRequestBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return friendsService.sendFriendRequest(body)
    })
)

export const respondToFriendRequest = createAsyncThunk(
  'friends/respondToFriendRequest',
  async (body: RespondToFriendRequestBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return friendsService.respondToFriendRequest(body)
    })
)

export const removeFriend = createAsyncThunk(
  'friends/removeFriend',
  async (body: RemoveFriendBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return friendsService.removeFriend(body)
    })
)
