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
} from './user.api.types'

import { User } from 'src/types/generic.types'
import { rsApi } from 'src/helpers/api'

export const loginUser = async (body: LoginUserBody) => {
  const url = '/auth/login'
  const response = await rsApi.post<User>(url, body)

  return response.data
}

export const signupUser = async (body: SignupUserBody) => {
  const url = '/auth/signup'
  const response = await rsApi.post<User>(url, body)

  return response.data
}

export const logoutUser = async (body: LogoutUserBody) => {
  const url = '/auth/logout'
  const response = await rsApi.get<{}>(url, body)

  return response.data
}

export const whoamiUser = async (body: WhoamiUserBody) => {
  const url = '/auth/whoami'
  const response = await rsApi.get<User | null>(url, body)

  return response.data
}

export const changeUsername = async (body: ChangeUsernameBody) => {
  const url = 'user/username'
  const response = await rsApi.patch<User>(url, body)

  return response.data
}

export const changePassword = async (body: ChangePasswordBody) => {
  const url = 'user/password'
  const response = await rsApi.patch<User>(url, body)

  return response.data
}

export const toggleTheme = async (body: ToggleThemeBody) => {
  const url = 'user/theme'
  const response = await rsApi.patch<User>(url, body)

  return response.data
}

export const changeAvatarColor = async (body: ChangeAvatarColorBody) => {
  const url = 'user/avatar/color'
  const response = await rsApi.patch<User>(url, body)

  return response.data
}

export const changeAvatarImage = async (body: ChangeAvatarImageBody) => {
  const url = 'user/avatar/image'
  const response = await rsApi.patch<User>(url, body)

  return response.data
}

export const changeUserLang = async ({ lang }: ChangeUserLangBody) => {
  const url = `user/lang/${lang}`
  const response = await rsApi.patch<User>(url)

  return response.data
}
