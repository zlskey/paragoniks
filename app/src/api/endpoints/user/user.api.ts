import {
  ChangeAvatarColorBody,
  ChangeAvatarImageBody,
  ChangePasswordBody,
  ChangeUserLangBody,
  ChangeUsernameBody,
  LoginUserBody,
  LoginUserResponse,
  LogoutUserBody,
  SignupUserBody,
  SignupUserResponse,
  ToggleThemeBody,
  WhoamiUserBody,
  WhoamiUserResponse,
} from './user.api.types'

import { User } from 'src/app/generic.types'
import { getRsApi } from 'src/api/rs.api'

export const loginUser = async (body: LoginUserBody) => {
  const url = '/auth/login'
  const rsApi = await getRsApi()
  const response = await rsApi.post<LoginUserResponse>(url, body)

  return response.data
}

export const signupUser = async (body: SignupUserBody) => {
  const url = '/auth/signup'
  const rsApi = await getRsApi()
  const response = await rsApi.post<SignupUserResponse>(url, body)

  return response.data
}

export const logoutUser = async (body: LogoutUserBody) => {
  const url = '/auth/logout'
  const rsApi = await getRsApi()
  const response = await rsApi.get<{}>(url, body)

  return response.data
}

export const whoamiUser = async (body: WhoamiUserBody) => {
  const url = '/auth/whoami'
  const rsApi = await getRsApi()
  const response = await rsApi.get<WhoamiUserResponse | null>(url, body)

  return response.data
}

export const testt = async (body: WhoamiUserBody) => {
  const url = '/auth/test'
  const rsApi = await getRsApi()
  const response = await rsApi.get<User | null>(url, body)

  return response.data
}

export const changeUsername = async (body: ChangeUsernameBody) => {
  const url = 'user/username'
  const rsApi = await getRsApi()
  const response = await rsApi.patch<User>(url, body)

  return response.data
}

export const changePassword = async (body: ChangePasswordBody) => {
  const url = 'user/password'
  const rsApi = await getRsApi()
  const response = await rsApi.patch<User>(url, body)

  return response.data
}

export const toggleTheme = async (body: ToggleThemeBody) => {
  const url = 'user/theme'
  const rsApi = await getRsApi()
  const response = await rsApi.patch<User>(url, body)

  return response.data
}

export const changeAvatarColor = async (body: ChangeAvatarColorBody) => {
  const url = 'user/avatar/color'
  const rsApi = await getRsApi()
  const response = await rsApi.patch<User>(url, body)

  return response.data
}

export const changeAvatarImage = async (body: ChangeAvatarImageBody) => {
  const url = 'user/avatar/image'
  const rsApi = await getRsApi()
  const response = await rsApi.patch<User>(url, body)

  return response.data
}

export const changeUserLang = async ({ lang }: ChangeUserLangBody) => {
  const url = `user/lang/${lang}`
  const rsApi = await getRsApi()
  const response = await rsApi.patch<User>(url)

  return response.data
}
