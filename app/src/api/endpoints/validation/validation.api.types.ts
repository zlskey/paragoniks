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
