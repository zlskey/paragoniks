import type { AvatarColor, ImageBase64, User, UserMeta } from '@types'

export interface LoginUserBody {
  usernameOrEmail: string
  password: string
}

export interface LoginUserResponse {
  user: User
  token: string
}

export interface IsUsernameTakenBody {
  username: string
  excludeGoogleAccount?: boolean
}

export interface IsEmailTakenBody {
  email: string
  excludeGoogleAccount: boolean
}

export interface IsUsernameOrEmailTakenBody {
  usernameOrEmail: string
  excludeGoogleAccount: boolean
}

export interface SignupUserBody {
  username: string
  password: string
  email: string | undefined
  avatarImage: string
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

export interface UpdateUserMetaBody {
  meta: Partial<UserMeta>
}

export interface GetUserFriendsOrAnonimsBody {}

export interface LoginWithGoogleBody {
  idToken: string
}

export interface SendPasswordRecoveryEmailBody {
  usernameOrEmail: string
}

export interface PasswordRecoveryCodeBody {
  code: string
  userId: string
}

export interface UpdatePasswordBody {
  password: string
}

export interface SendPasswordRecoveryEmailResponse {
  userId: string
}

export interface ConfirmEmailBody {
  hash: string
  accountId: string
}
