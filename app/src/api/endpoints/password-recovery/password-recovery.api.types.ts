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
