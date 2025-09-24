import type { Profile, User } from '@types'
import type {
  ChangeAvatarColorBody,
  ChangeAvatarImageBody,
  ChangePasswordBody,
  ChangeUserLangBody,
  ChangeUsernameBody,
  ConfirmEmailBody,
  GetUserFriendsOrAnonimsBody,
  IsEmailTakenBody,
  IsUsernameOrEmailTakenBody,
  IsUsernameTakenBody,
  LoginUserBody,
  LoginUserResponse,
  LoginWithGoogleBody,
  LogoutUserBody,
  PasswordRecoveryCodeBody,
  SendPasswordRecoveryEmailBody,
  SendPasswordRecoveryEmailResponse,
  SignupUserBody,
  SignupUserResponse,
  ToggleThemeBody,
  UpdatePasswordBody,
  UpdateUserMetaBody,
  WhoamiUserBody,
  WhoamiUserResponse,
} from './user.api.types'
import { getRsApi } from '@api/rs.api'

export async function loginUser(body: LoginUserBody) {
  const url = 'auth/login'
  const rsApi = await getRsApi()
  const response = await rsApi.post<LoginUserResponse>(url, body)

  return response.data
}

export async function signupUser(body: SignupUserBody) {
  const url = 'auth/signup'
  const rsApi = await getRsApi()
  const response = await rsApi.post<SignupUserResponse>(url, body)

  return response.data
}

export async function loginWithGoogle(body: LoginWithGoogleBody) {
  const url = 'auth/login/google'
  const rsApi = await getRsApi()
  const response = await rsApi.post<LoginUserResponse>(url, body)
  return response.data
}

export async function logoutUser(body: LogoutUserBody) {
  const url = 'auth/logout'
  const rsApi = await getRsApi()
  const response = await rsApi.get<{}>(url, body)

  return response.data
}

export async function whoamiUser(body: WhoamiUserBody) {
  const url = 'auth/whoami'
  const rsApi = await getRsApi()
  const response = await rsApi.get<WhoamiUserResponse | null>(url, body)

  return response.data
}

export async function isUsernameTaken(body: IsUsernameTakenBody) {
  const url = 'auth/is-username-taken'
  const rsApi = await getRsApi()
  const response = await rsApi.post<boolean>(url, body)

  return response.data
}

export async function isEmailTaken(body: IsEmailTakenBody) {
  const url = 'auth/is-email-taken'
  const rsApi = await getRsApi()
  const response = await rsApi.post<boolean>(url, body)

  return response.data
}

export async function isUsernameOrEmailTaken(body: IsUsernameOrEmailTakenBody) {
  const url = 'auth/is-username-or-email-taken'
  const rsApi = await getRsApi()
  const response = await rsApi.post<boolean>(url, body)

  return response.data
}

export async function changeUsername(body: ChangeUsernameBody) {
  const url = 'user/username'
  const rsApi = await getRsApi()
  const response = await rsApi.patch<User>(url, body)

  return response.data
}

export async function changePassword(body: ChangePasswordBody) {
  const url = 'user/password'
  const rsApi = await getRsApi()
  const response = await rsApi.patch<User>(url, body)

  return response.data
}

export async function toggleTheme(body: ToggleThemeBody) {
  const url = 'user/theme'
  const rsApi = await getRsApi()
  const response = await rsApi.patch<User>(url, body)

  return response.data
}

export async function changeAvatarColor(body: ChangeAvatarColorBody) {
  const url = 'user/avatar/color'
  const rsApi = await getRsApi()
  const response = await rsApi.patch<User>(url, body)

  return response.data
}

export async function changeAvatarImage(body: ChangeAvatarImageBody) {
  const url = 'user/avatar/image'
  const rsApi = await getRsApi()
  const response = await rsApi.patch<User>(url, body)

  return response.data
}

export async function changeUserLang({ lang }: ChangeUserLangBody) {
  const url = `user/lang/${lang}`
  const rsApi = await getRsApi()
  const response = await rsApi.patch<User>(url)

  return response.data
}

export async function updateUserMeta(body: UpdateUserMetaBody) {
  const url = 'user/meta'
  const rsApi = await getRsApi()
  const response = await rsApi.patch<User>(url, body)
  return response.data
}

export async function getUserFriendsOrAnonims(body: GetUserFriendsOrAnonimsBody) {
  const url = 'user/friends'
  const rsApi = await getRsApi()
  const response = await rsApi.get<Profile[]>(url, body)

  return response.data
}

export async function sendPasswordRecoveryEmail(body: SendPasswordRecoveryEmailBody) {
  const url = 'auth/password-recovery/send-email'
  const rsApi = await getRsApi()
  const response = await rsApi.post<SendPasswordRecoveryEmailResponse>(url, body, {
    timeout: 100000,
  })

  return response.data
}

export async function passwordRecoveryCode(body: PasswordRecoveryCodeBody) {
  const url = 'auth/password-recovery/verify-code'
  const rsApi = await getRsApi()
  const response = await rsApi.post<LoginUserResponse>(url, body)

  return response.data
}

export async function updatePassword(body: UpdatePasswordBody) {
  const url = 'auth/password-recovery/update-password'
  const rsApi = await getRsApi()
  const response = await rsApi.post(url, body)

  return response.data
}

export async function confirmEmail(body: ConfirmEmailBody) {
  const url = 'auth/confirm-email'
  const rsApi = await getRsApi()
  const response = await rsApi.post(url, body)

  return response.data
}
