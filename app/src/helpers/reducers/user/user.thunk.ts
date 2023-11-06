import {
  RespondToFriendRequestBody,
  UserLoginBody,
  UserSignupBody,
} from './user.types'

import { User } from 'src/types/generic.types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { rsApi } from 'src/helpers/services/rs.service'
import { wrapThunk } from 'src/helpers/utils/wrap-thunk'

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: UserLoginBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.post<User>('/auth/login', data)

      return response.data
    })
)

export const signupUser = createAsyncThunk(
  'user/signup',
  async (data: UserSignupBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.post<User>('/auth/signup', data)

      return response.data
    })
)

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      await rsApi.get('/auth/logout')

      return
    })
)

export const whoamiUser = createAsyncThunk(
  'user/whoami',
  async (_, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.get<User | null>('/auth/whoami')

      return response.data
    })
)

export const sendFriendRequest = createAsyncThunk(
  'user/sendFriendRequest',
  async (username: string, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.patch<User>('user/friend', { username })

      return response.data
    })
)

export const respondToFriendRequest = createAsyncThunk(
  'user/respondToFriendRequest',
  async (body: RespondToFriendRequestBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.patch<User>('user/friend/respond', body)

      return response.data
    })
)

export const removeFriend = createAsyncThunk(
  'user/removeFriend',
  async (username: string, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.delete<User>(`user/friend/${username}`)

      return response.data
    })
)
