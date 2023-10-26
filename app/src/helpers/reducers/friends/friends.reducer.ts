import { Friend, RsApiError } from 'src/types/generic.types'
import { getFriends, removeFriend } from './friends.thunk'

import { RootState } from 'src/redux-store'
import { createSlice } from '@reduxjs/toolkit'

interface FriendsState {
  items: Friend[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: RsApiError['message'] | null
}

const initialState: FriendsState = {
  items: [],
  loading: 'idle',
  error: null,
}

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getFriends.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.items = action.payload
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })

    builder
      .addCase(removeFriend.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.items = action.payload
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
  },
})

export const selectFriends = (state: RootState) => state.friends.items

export const selectFriendsLoading = (state: RootState) => state.friends.loading

export const selectFriendsError = (state: RootState) => state.friends.error

export const {} = friendsSlice.actions

export default friendsSlice.reducer
