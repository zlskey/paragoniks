import { RsApiError, User } from 'src/types/generic.types'
import {
  loginUser,
  logoutUser,
  removeFriend,
  respondToFriendRequest,
  sendFriendRequest,
  signupUser,
  whoamiUser,
} from './user.thunk'

import { RootState } from 'src/redux-store'
import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  data: User | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: RsApiError['message'] | null
}

const initialState: UserState = {
  data: null,
  loading: 'idle',
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setManualy(state, action) {
      state.data = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.data = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })

    builder
      .addCase(signupUser.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.data = action.payload
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })

    builder
      .addCase(logoutUser.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loading = 'succeeded'
        state.data = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })

    builder
      .addCase(whoamiUser.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(whoamiUser.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.data = action.payload
      })
      .addCase(whoamiUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })

    builder
      .addCase(sendFriendRequest.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.data = action.payload
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })

    builder
      .addCase(respondToFriendRequest.pending, state => {
        state.loading = 'pending'
        state.error = null
      })
      .addCase(respondToFriendRequest.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.data = action.payload
      })
      .addCase(respondToFriendRequest.rejected, (state, action) => {
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
        state.data = action.payload
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
      })
  },
})

export const selectUser = (state: RootState) => state.user.data

export const selectUserLoading = (state: RootState) => state.user.loading

export const selectUserError = (state: RootState) => state.user.error

export const { setManualy, clearError } = userSlice.actions

export default userSlice.reducer
