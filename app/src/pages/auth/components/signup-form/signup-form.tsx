import { FormProvider, useForm } from 'react-hook-form'
import { Stack, TextField, Typography } from '@mui/material'
import {
  clearError,
  selectUserError,
  selectUserLoading,
} from 'src/helpers/reducers/user/user.reducer'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import { LoadingButton } from '@mui/lab'
import PasswordTextField from 'src/components/password-text-field'
import { signupUser } from 'src/helpers/reducers/user/user.thunk'
import { userSchema } from 'src/helpers/utils/user-validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'

const defaultValues = {
  username: '',
  password: '',
  repeatPassword: '',
}

const SignupForm = () => {
  const formControl = useForm({
    defaultValues,
    resolver: yupResolver(userSchema),
  })

  const dispatch = useAppDispatch()

  const status = useAppSelector(selectUserLoading)

  const error = useAppSelector(selectUserError)

  const isLoading = status === 'pending'

  const isFailed = status === 'failed'

  const handleSignup = ({ username, password }: typeof defaultValues) => {
    dispatch(clearError())
    dispatch(signupUser({ username, password }))
  }

  const getErrorMessage = (field: keyof typeof defaultValues) => {
    return formControl.formState.errors[field]?.message || ''
  }

  return (
    <FormProvider {...formControl}>
      <form onSubmit={formControl.handleSubmit(handleSignup)}>
        <TextField
          {...formControl.register('username')}
          spellCheck='false'
          label='Username'
          variant='filled'
          error={Boolean(getErrorMessage('username')) || isFailed}
          helperText={getErrorMessage('username')}
        />

        <PasswordTextField
          label='Password'
          name='password'
          errorMessage={getErrorMessage('password')}
          isFailed={isFailed}
        />

        <PasswordTextField
          label='Repeat Password'
          name='repeatPassword'
          errorMessage={getErrorMessage('repeatPassword')}
          isFailed={isFailed}
        />

        <Typography color='error'>{error}</Typography>

        <Stack direction='row' alignItems='center' justifyContent='center'>
          <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            variant='contained'
            type='submit'
          >
            SignUp
          </LoadingButton>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default SignupForm
