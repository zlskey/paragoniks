export interface PasswordTextFieldProps {
  label: string
  name: string
  errorMessage?: string
  isFailed: boolean
}

export interface PasswordTextFieldEndAdornmentProps {
  showPassword: boolean
  onToggle: () => void
}
