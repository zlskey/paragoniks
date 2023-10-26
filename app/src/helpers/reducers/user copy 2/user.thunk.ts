import { User } from 'src/types/generic.types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { rsApi } from 'src/helpers/services/rs.service'
import { wrapThunk } from 'src/helpers/utils/wrap-thunk'

interface UserLoginData {
  username: string
  password: string
}

interface UserSignupData extends UserLoginData {
  repeatPassword: string
}

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: UserLoginData, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.post<User>('/auth/login', data)

      return response.data
    })
)

export const signupUser = createAsyncThunk(
  'user/signup',
  async (data: UserSignupData, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      const response = await rsApi.post<User>('/auth/signup', data)

      return response.data
    })
)

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await rsApi.get('/auth/logout')

  return
})

export const whoamiUser = createAsyncThunk('user/whoami', async () => {
  const response = await rsApi.get<User | null>('/auth/whoami')

  return response.data
})
