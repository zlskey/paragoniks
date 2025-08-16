import type { LoginFormData } from '../types'
import AuthFooter from '@components/auth-flow/auth-footer'
import AuthWrapper from '@components/auth-flow/auth-wrapper'
import AuthTextField from '@components/auth-textfield'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAuthNavigation } from '../hooks'
import useIsUsernameTaken from '../hooks/use-is-username-taken'
import { AUTH_LABELS, AUTH_TITLES, DEFAULT_FORM_VALUES } from '../utils'

export const loginUsernameSchema = yup.object().shape({
  username: yup
    .string()
    .lowercase()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(32, 'Username must be at most 32 characters'),
})

function Login() {
  const form = useForm<LoginFormData>({
    defaultValues: DEFAULT_FORM_VALUES.LOGIN,
    resolver: yupResolver(loginUsernameSchema),
  })
  const username = form.watch('username')

  const { data: doesUserExist, isLoading } = useIsUsernameTaken(username)
  const { navigateToLoginPassword, navigateToPasswordRecovery } = useAuthNavigation()

  function onSubmit(data: LoginFormData) {
    navigateToLoginPassword(data.username)
  }

  useEffect(() => {
    if (doesUserExist === true) {
      form.clearErrors('username')
    }
    if (doesUserExist === false) {
      form.setError(
        'username',
        {
          message: 'Podana nazwa użytkownika lub email, nie jest przypisany do żadnego konta',
        },
      )
    }
  }, [doesUserExist, form])

  const shouldGoForwardButtonBeDisabled = isLoading || !!form.formState.errors.username || !username

  return (
    <AuthWrapper title={AUTH_TITLES.LOGIN} subtitle={AUTH_TITLES.LOGIN_SUBTITLE}>
      <FormProvider {...form}>
        <AuthTextField
          name="username"
          label={AUTH_LABELS.USERNAME}
          autoCorrect={false}
          style={{ textTransform: 'lowercase' }}
          status={doesUserExist === undefined ? undefined : doesUserExist ? 'valid' : 'error'}
          error={form.formState.errors.username}
          autoComplete="username"
          isLoading={isLoading}
        />

        <AuthFooter
          leftButtonLabel={AUTH_LABELS.FORGOT_PASSWORD}
          onLeftButtonPress={navigateToPasswordRecovery}
          // @todo - implement password recovery
          leftButtonProps={{ style: { display: 'none' } }}
          rightButtonLabel={AUTH_LABELS.NEXT}
          onRightButtonPress={form.handleSubmit(onSubmit)}
          rightButtonProps={{ disabled: shouldGoForwardButtonBeDisabled }}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default Login
