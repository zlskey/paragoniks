import { FormProvider, useForm } from 'react-hook-form'
import { Stack, TextField, Typography } from '@mui/material'
import {
  selectUserError,
  selectUserLoading,
} from 'src/helpers/reducers/user/user.reducer'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import { LoadingButton } from '@mui/lab'
import { signupUser } from 'src/helpers/reducers/user/user.thunk'

interface FormData {
  username: string
  password: string
  repeatPassword: string
}

const defaultValues: FormData = {
  username: '',
  password: '',
  repeatPassword: '',
}

const SignupForm = () => {
  const formControl = useForm({ defaultValues })

  const dispatch = useAppDispatch()

  const status = useAppSelector(selectUserLoading)

  const error = useAppSelector(selectUserError)

  const isLoading = status === 'pending'

  const isFailed = status === 'failed'

  const handleSignup = (data: FormData) => {
    dispatch(signupUser(data))
  }

  return (
    <FormProvider {...formControl}>
      <TextField
        {...formControl.register('username')}
        spellCheck='false'
        label='Username'
        variant='filled'
        error={isFailed}
      />
      <TextField
        {...formControl.register('password')}
        spellCheck='false'
        label='Password'
        variant='filled'
        type='password'
        error={isFailed}
      />
      <TextField
        {...formControl.register('repeatPassword')}
        spellCheck='false'
        label='Repeat Password'
        variant='filled'
        type='password'
        error={isFailed}
      />

      <Typography color='error'>{error}</Typography>

      <Stack direction='row' alignItems='center' justifyContent='center'>
        <LoadingButton
          disabled={isLoading}
          onClick={formControl.handleSubmit(handleSignup)}
          loading={isLoading}
          variant='contained'
        >
          SignUp
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}

export default SignupForm
