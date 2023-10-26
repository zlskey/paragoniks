import { Friend } from 'src/types/generic.types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { rsApi } from 'src/helpers/services/rs.service'
import { wrapThunk } from 'src/helpers/utils/wrap-thunk'

export const getFriends = createAsyncThunk(
  'friends/getFriends',
  async (_, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.get<Friend[]>('/friend')

      return response.data
    })
)

export const removeFriend = createAsyncThunk(
  'friends/addFriend',
  async (username: Friend['username'], { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.delete<Friend[]>(`/friend/${username}`)

      return response.data
    })
)
