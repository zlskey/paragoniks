export interface LoginFormData {
  usernameOrEmail: string
}

export interface LoginPasswordFormData {
  password: string
}

export interface SignupFormData {
  username: string
}

export interface SignupEmailFormData {
  email?: string | null
}

export interface SignupPasswordFormData {
  password: string
  repeatPassword: string
}

export interface SignupProfileFormData {
  avatar: string
}

export interface PasswordRecoveryFormData {
  usernameOrEmail: string
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
  email?: string
  userId?: string
  usernameOrEmail?: string
}
