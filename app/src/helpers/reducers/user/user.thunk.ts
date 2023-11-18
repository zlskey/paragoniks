import {
  ChangeAvatarColorBody,
  ChangeAvatarImageBody,
  ChangePasswordBody,
  ChangeUserLangBody,
  ChangeUsernameBody,
  LoginUserBody,
  LogoutUserBody,
  SignupUserBody,
  ToggleThemeBody,
  WhoamiUserBody,
} from 'src/helpers/services/endpoints/user/user.service.types'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { userService } from 'src/helpers/services'
import { wrapThunk } from 'src/helpers/utils/wrap-thunk'

export const loginUser = createAsyncThunk(
  'user/login',
  async (body: LoginUserBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return userService.loginUser(body)
    })
)

export const signupUser = createAsyncThunk(
  'user/signup',
  async (body: SignupUserBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return userService.signupUser(body)
    })
)

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (body: LogoutUserBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return userService.logoutUser(body)
    })
)

export const whoamiUser = createAsyncThunk(
  'user/whoami',
  async (body: WhoamiUserBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return userService.whoamiUser(body)
    })
)

export const changeUsername = createAsyncThunk(
  'user/changeUsername',
  async (body: ChangeUsernameBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return userService.changeUsername(body)
    })
)

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (body: ChangePasswordBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return userService.changePassword(body)
    })
)

export const toggleTheme = createAsyncThunk(
  'user/toggleTheme',
  async (body: ToggleThemeBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return userService.toggleTheme(body)
    })
)

export const changeAvatarColor = createAsyncThunk(
  'user/changeAvatarColor',
  async (body: ChangeAvatarColorBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return userService.changeAvatarColor(body)
    })
)

export const changeAvatarImage = createAsyncThunk(
  'user/changeAvatarImage',
  async (body: ChangeAvatarImageBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return userService.changeAvatarImage(body)
    })
)

export const changeUserLang = createAsyncThunk(
  'user/changeAvatarImage',
  async (body: ChangeUserLangBody, { rejectWithValue }) =>
    wrapThunk(rejectWithValue, async () => {
      return userService.changeUserLang(body)
    })
)
