import { RootState } from 'src/redux-store'
import { User } from '@spotify/web-api-ts-sdk'
import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  profile: null | User
}

const initialState: UserState = {
  profile: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.profile = null
    },
    login(state, action) {
      state.profile = action.payload
    },
  },
})

export const selectUser = (state: RootState) => state.user.profile

export const { logout, login } = userSlice.actions

export default userSlice.reducer
