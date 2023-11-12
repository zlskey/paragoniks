import {
  ActionReducerMapBuilder,
  AsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'
import { RsApiError, User } from 'src/types/generic.types'
import {
  changeAvatarColor,
  changePassword,
  changeUsername,
  loginUser,
  logoutUser,
  signupUser,
  toggleTheme,
  whoamiUser,
} from './user.thunk'

import { RootState } from 'src/redux-store'

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
      state.loading = 'idle'
    },
  },
  extraReducers: builder => {
    addBuilderCase(builder, loginUser)
    addBuilderCase(builder, logoutUser)
    addBuilderCase(builder, signupUser)
    addBuilderCase(builder, whoamiUser)
    addBuilderCase(builder, toggleTheme)
    addBuilderCase(builder, changePassword)
    addBuilderCase(builder, changeUsername)
    addBuilderCase(builder, changeAvatarColor)
  },
})

const addBuilderCase = (
  builder: ActionReducerMapBuilder<UserState>,
  asyncThunk: AsyncThunk<any, any, any>
) => {
  return builder
    .addCase(asyncThunk.pending, state => {
      state.loading = 'pending'
      state.error = null
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.data = action.payload
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.loading = 'failed'
      state.error = action.payload as string
    })
}

export const selectUser = (state: RootState) => state.user.data

export const selectUserLoading = (state: RootState) => state.user.loading

export const selectUserError = (state: RootState) => state.user.error

export const { setManualy, clearError: clearUserError } = userSlice.actions

export default userSlice.reducer
