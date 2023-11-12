import { AvatarColor } from 'src/types/generic.types'

export interface LoginUserBody {
  username: string
  password: string
}

export interface SignupUserBody {
  username: string
  password: string
}

export interface LogoutUserBody {}

export interface WhoamiUserBody {}

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
