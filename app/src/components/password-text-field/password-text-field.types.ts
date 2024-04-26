import { ReactNode } from 'react'

export interface PasswordTextFieldProps {
  label: ReactNode
  name: string
  errorMessage?: string
  isFailed: boolean
}

export interface PasswordTextFieldEndAdornmentProps {
  showPassword: boolean
  onToggle: () => void
}
