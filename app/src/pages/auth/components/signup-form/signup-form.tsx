import { FormProvider, useForm } from 'react-hook-form'
import { Grid, TextField, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { LoadingButton } from '@mui/lab'
import PasswordTextField from 'src/components/password-text-field'
import { Trans } from '@lingui/macro'
import { signupUser } from 'src/helpers/services/endpoints/user/user.service'
import { useState } from 'react'
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

  const queryClient = useQueryClient()

  const [error, setError] = useState('')

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ['user', 'signup'],
    mutationFn: signupUser,
    onSuccess: user => {
      queryClient.setQueryData(['user', 'whoami'], user)
    },
    onError: (err: any) => {
      if (err.response.data.error.message) {
        setError(err.response.data.error.message)
      }
    },
  })

  const handleSignup = ({ username, password }: typeof defaultValues) => {
    mutate({ username, password })
  }

  const getErrorMessage = (field: keyof typeof defaultValues) => {
    return formControl.formState.errors[field]?.message || ''
  }

  return (
    <FormProvider {...formControl}>
      <form onSubmit={formControl.handleSubmit(handleSignup)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...formControl.register('username')}
              fullWidth
              spellCheck='false'
              label={<Trans>Username</Trans>}
              variant='filled'
              error={Boolean(getErrorMessage('username')) || isError}
              helperText={getErrorMessage('username')}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <PasswordTextField
              label={<Trans>Password</Trans>}
              name='password'
              errorMessage={getErrorMessage('password')}
              isFailed={isError}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <PasswordTextField
              label={<Trans>Repeat Password</Trans>}
              name='repeatPassword'
              errorMessage={getErrorMessage('repeatPassword')}
              isFailed={isError}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography color='error'>{error}</Typography>
          </Grid>

          <Grid item xs={12} justifyContent='center' display='flex'>
            <LoadingButton
              disabled={isPending}
              loading={isPending}
              variant='contained'
              type='submit'
            >
              <Trans>SignUp</Trans>
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default SignupForm
