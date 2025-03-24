import type { AvatarColor, ImageBase64, User } from 'src/app/generic.types'

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
  user: User
  token: string
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
  image: ImageBase64
}

export interface ChangeUserLangBody {
  lang: 'PL' | 'EN'
}
