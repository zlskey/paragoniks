import { FormProvider, useForm } from 'react-hook-form'
import { Stack, TextField, Typography } from '@mui/material'
import {
  selectUserError,
  selectUserLoading,
} from 'src/helpers/reducers/user/user.reducer'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import { LoadingButton } from '@mui/lab'
import { loginUser } from 'src/helpers/reducers/user/user.thunk'

interface FormData {
  username: string
  password: string
}

const defaultValues: FormData = {
  username: '',
  password: '',
}

const LoginForm = () => {
  const formControl = useForm({ defaultValues })

  const dispatch = useAppDispatch()

  const error = useAppSelector(selectUserError)

  const isLoading = useAppSelector(selectUserLoading) === 'pending'

  const handleLogin = (data: FormData) => {
    dispatch(loginUser(data))
  }

  return (
    <FormProvider {...formControl}>
      <TextField
        {...formControl.register('username')}
        spellCheck='false'
        label='Username'
        variant='filled'
        error={Boolean(error)}
      />
      <TextField
        {...formControl.register('password')}
        spellCheck='false'
        label='Password'
        variant='filled'
        type='password'
        error={Boolean(error)}
      />

      <Typography color='error'>{error}</Typography>

      <Stack direction='row' alignItems='center' justifyContent='center'>
        <LoadingButton
          disabled={isLoading}
          onClick={formControl.handleSubmit(handleLogin)}
          loading={isLoading}
          variant='contained'
        >
          Login
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}

export default LoginForm
