import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Tooltip,
} from '@mui/material'
import {
  PasswordTextFieldEndAdornmentProps,
  PasswordTextFieldProps,
} from './password-text-field.types'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { Trans } from '@lingui/macro'
import { useFormContext } from 'react-hook-form'
import { useState } from 'react'

const PasswordTextField = ({
  label,
  name,
  errorMessage,
  isFailed,
}: PasswordTextFieldProps) => {
  const { register } = useFormContext()
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  return (
    <FormControl fullWidth variant='filled'>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <FilledInput
        fullWidth
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <PasswordTextFieldEndAdornment
            showPassword={showPassword}
            onToggle={handleClickShowPassword}
          />
        }
        error={Boolean(errorMessage || isFailed)}
        {...register(name)}
      />
      <FormHelperText error>{errorMessage}</FormHelperText>
    </FormControl>
  )
}

const PasswordTextFieldEndAdornment = ({
  showPassword,
  onToggle,
}: PasswordTextFieldEndAdornmentProps) => {
  return (
    <InputAdornment position='end'>
      <Tooltip
        aria-label='toggle password visibility'
        title={
          showPassword ? (
            <Trans>Hide password</Trans>
          ) : (
            <Trans>Show password</Trans>
          )
        }
      >
        <IconButton onClick={onToggle} edge='end'>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </Tooltip>
    </InputAdornment>
  )
}

export default PasswordTextField
