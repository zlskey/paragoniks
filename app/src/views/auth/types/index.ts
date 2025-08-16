export interface LoginFormData {
  username: string
}

export interface LoginPasswordFormData {
  password: string
}

export interface SignupFormData {
  username: string
}

export interface SignupPasswordFormData {
  password: string
  repeatPassword: string
}

export interface SignupProfileFormData {
  avatar: string
}

export interface PasswordRecoveryFormData {
  username: string
}

export interface PasswordRecoveryCodeFormData {
  code: string
}

export interface NewPasswordFormData {
  password: string
  repeatPassword: string
}

export interface AuthParams {
  username?: string
  password?: string
}
