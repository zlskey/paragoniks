import { AvatarColor, User } from 'src/types/generic.types'

import { Locale } from 'src/helpers/i18n/i18n.types'

export interface LoginUserBody {
  username: string
  password: string
}

export interface LoginUserResponse {
  user: User
  token: string
}

export interface SignupUserBody {
  username: string
  password: string
}

export interface SignupUserResponse {
  user: User
  token: string
}

export interface LogoutUserBody {}

export interface WhoamiUserBody {}

export interface WhoamiUserResponse {
  user: User | null
  token: string | null
}

export interface ChangeUsernameBody {
  username: string
}

export interface ChangePasswordBody {
  currentPassword: string
  newPassword: string
}

export interface ToggleThemeBody {}

export interface ChangeAvatarColorBody {
  color: AvatarColor
}

export interface ChangeAvatarImageBody {
  image: File
}

export interface ChangeUserLangBody {
  lang: Locale
}
