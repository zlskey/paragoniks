import { FormProvider, useForm } from 'react-hook-form'
import { Stack, TextField, Typography } from '@mui/material'
import {
  selectUserError,
  selectUserLoading,
} from 'src/helpers/reducers/user/user.reducer'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import { LoadingButton } from '@mui/lab'
import PasswordTextField from 'src/components/password-text-field/password-text-field'
import { loginUser } from 'src/helpers/reducers/user/user.thunk'

const defaultValues = {
  username: '',
  password: '',
}

const LoginForm = () => {
  const formControl = useForm({ defaultValues })

  const dispatch = useAppDispatch()

  const error = useAppSelector(selectUserError)

  const isLoading = useAppSelector(selectUserLoading) === 'pending'

  const handleLogin = (data: typeof defaultValues) => {
    dispatch(loginUser(data))
  }

  return (
    <FormProvider {...formControl}>
      <form onSubmit={formControl.handleSubmit(handleLogin)}>
        <Stack spacing={2}>
          <TextField
            {...formControl.register('username')}
            spellCheck='false'
            label='Username'
            variant='filled'
            error={Boolean(error)}
          />

          <PasswordTextField
            label='Password'
            name='password'
            isFailed={Boolean(error)}
          />

          <Typography color='error'>{error}</Typography>

          <Stack direction='row' alignItems='center' justifyContent='center'>
            <LoadingButton
              disabled={isLoading}
              loading={isLoading}
              variant='contained'
              type='submit'
            >
              Login
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default LoginForm
