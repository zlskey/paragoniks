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
} from './user.service.types'

import { User } from 'src/types/generic.types'
import { rsApi } from 'src/helpers/services'

export const loginUser = async (body: LoginUserBody) => {
  const response = await rsApi.post<User>('/auth/login', body)

  return response.data
}

export const signupUser = async (body: SignupUserBody) => {
  const response = await rsApi.post<User>('/auth/signup', body)

  return response.data
}

export const logoutUser = async (body: LogoutUserBody) => {
  const response = await rsApi.get<{}>('/auth/logout', body)

  return response.data
}

export const whoamiUser = async (body: WhoamiUserBody) => {
  const response = await rsApi.get<User | null>('/auth/whoami', body)

  return response.data
}

export const changeUsername = async (body: ChangeUsernameBody) => {
  const response = await rsApi.patch<User>('user/username', body)

  return response.data
}

export const changePassword = async (body: ChangePasswordBody) => {
  const response = await rsApi.patch<User>('user/password', body)

  return response.data
}

export const toggleTheme = async (body: ToggleThemeBody) => {
  const response = await rsApi.patch<User>('user/theme', body)

  return response.data
}

export const changeAvatarColor = async (body: ChangeAvatarColorBody) => {
  const response = await rsApi.patch<User>('user/avatar/color', body)

  return response.data
}

export const changeAvatarImage = async (body: ChangeAvatarImageBody) => {
  const response = await rsApi.patch<User>('user/avatar/image', body)

  return response.data
}

export const changeUserLang = async ({ lang }: ChangeUserLangBody) => {
  const response = await rsApi.patch<User>(`user/lang/${lang}`)

  return response.data
}
