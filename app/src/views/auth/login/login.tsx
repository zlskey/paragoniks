import type { LoginFormData } from '../types'
import AuthFooter from '@components/auth-flow/auth-footer'
import AuthWrapper from '@components/auth-flow/auth-wrapper'
import AuthTextField from '@components/auth-textfield'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAuthNavigation } from '../hooks'
import useIsUsernameTakenOrEmailTaken from '../hooks/use-is-username-or-email-taken'
import { AUTH_LABELS, AUTH_TITLES, DEFAULT_FORM_VALUES } from '../utils'

export const usernameOrEmailSchema = yup.object().shape({
  usernameOrEmail: yup
    .string()
    .required('Username or email is required')
    .min(3, 'Username or email must be at least 3 characters')
    .max(32, 'Username or email must be at most 32 characters'),
})

function Login() {
  const form = useForm<LoginFormData>({
    defaultValues: DEFAULT_FORM_VALUES.LOGIN,
    resolver: yupResolver(usernameOrEmailSchema),
  })
  const usernameOrEmail = form.watch('usernameOrEmail')

  const { data: isUsernameOrEmailRegistered, isLoading } = useIsUsernameTakenOrEmailTaken(usernameOrEmail, true)
  const { navigateToLoginPassword, navigateToPasswordRecovery } = useAuthNavigation()

  function onSubmit(data: LoginFormData) {
    navigateToLoginPassword(data.usernameOrEmail)
  }

  useEffect(() => {
    if (isUsernameOrEmailRegistered === true) {
      form.clearErrors('usernameOrEmail')
    }
    if (isUsernameOrEmailRegistered === false) {
      form.setError(
        'usernameOrEmail',
        {
          message: 'Podana nazwa użytkownika lub email, nie jest przypisany do żadnego konta',
        },
      )
    }
  }, [isUsernameOrEmailRegistered, form])

  const shouldGoForwardButtonBeDisabled = isLoading
    || !!form.formState.errors.usernameOrEmail
    || !usernameOrEmail
    || isUsernameOrEmailRegistered !== true

  return (
    <AuthWrapper title={AUTH_TITLES.LOGIN} subtitle={AUTH_TITLES.LOGIN_SUBTITLE}>
      <FormProvider {...form}>
        <AuthTextField
          name="usernameOrEmail"
          label={AUTH_LABELS.USERNAME_OR_EMAIL}
          autoCorrect={false}
          status={isUsernameOrEmailRegistered === undefined ? undefined : isUsernameOrEmailRegistered ? 'valid' : 'error'}
          error={form.formState.errors.usernameOrEmail}
          autoComplete="username"
          isLoading={isLoading}
          formatValue={value => value.toLowerCase()}
        />

        <AuthFooter
          leftButtonLabel={AUTH_LABELS.FORGOT_PASSWORD}
          onLeftButtonPress={navigateToPasswordRecovery}
          rightButtonLabel={AUTH_LABELS.NEXT}
          onRightButtonPress={form.handleSubmit(onSubmit)}
          rightButtonProps={{ loading: isLoading, disabled: shouldGoForwardButtonBeDisabled }}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default Login
