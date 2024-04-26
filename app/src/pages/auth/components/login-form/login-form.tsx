import { FormProvider, useForm } from 'react-hook-form'
import { Stack, TextField, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { LoadingButton } from '@mui/lab'
import { LoginUserBody } from 'src/helpers/api/endpoints/user/user.api.types'
import PasswordTextField from 'src/components/password-text-field/password-text-field'
import { Trans } from '@lingui/macro'
import { loginUser } from 'src/helpers/api/endpoints/user/user.api'
import { useState } from 'react'

const defaultValues: LoginUserBody = {
  username: '',
  password: '',
}

const LoginForm = () => {
  const formControl = useForm({ defaultValues })

  const [error, setError] = useState('')

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['user', 'login'],
    mutationFn: loginUser,
    onSuccess: user => {
      queryClient.setQueryData(['user', 'whoami'], user)
    },
    onError: (err: any) => {
      if (err.response.data.error.message) {
        setError(err.response.data.error.message)
      }
    },
  })

  return (
    <FormProvider {...formControl}>
      <form onSubmit={formControl.handleSubmit(data => mutate(data))}>
        <Stack spacing={2}>
          <TextField
            {...formControl.register('username')}
            required
            spellCheck='false'
            label={<Trans>Username</Trans>}
            variant='filled'
            error={Boolean(error)}
          />

          <PasswordTextField
            label={<Trans>Password</Trans>}
            name='password'
            isFailed={Boolean(error)}
          />

          <Typography color='error'>{error}</Typography>

          <Stack direction='row' alignItems='center' justifyContent='center'>
            <LoadingButton
              disabled={isPending}
              loading={isPending}
              variant='contained'
              type='submit'
            >
              <Trans>Login</Trans>
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  )
}

export default LoginForm
