import type { AuthParams, SignupEmailFormData } from '../types'
import AuthFooter from '@components/auth-flow/auth-footer'
import AuthWrapper from '@components/auth-flow/auth-wrapper'
import AuthTextField from '@components/auth-textfield'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAuthNavigation } from '../hooks'
import useIsEmailTaken from '../hooks/use-is-email-taken'
import { AUTH_LABELS, AUTH_TITLES, DEFAULT_FORM_VALUES } from '../utils'

const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email('Nieprawidłowy format email')
    .nullable()
    .notRequired(),
})

function SignupEmail() {
  const { username } = useLocalSearchParams() as AuthParams
  const { navigateToSignupPassword } = useAuthNavigation()

  const form = useForm<SignupEmailFormData>({
    defaultValues: DEFAULT_FORM_VALUES.SIGNUP_EMAIL,
    resolver: yupResolver(emailSchema),
    mode: 'onChange',
  })

  const email = form.watch('email')

  const { data: isEmailTaken, isLoading } = useIsEmailTaken(email ?? '', true)

  function onSubmit(data: SignupEmailFormData) {
    if (username) {
      navigateToSignupPassword(username, data.email ?? undefined)
    }
  }

  function onSkip() {
    if (username) {
      navigateToSignupPassword(username, undefined)
    }
  }

  useEffect(() => {
    if (isEmailTaken) {
      form.setError('email', { type: 'manual', message: 'Podany email jest już zajęty' })
    }
    else if (form.formState.errors.email?.type === 'manual') {
      form.clearErrors('email')
    }
  }, [isEmailTaken])

  return (
    <AuthWrapper title={AUTH_TITLES.SIGNUP}>
      <FormProvider {...form}>
        <AuthTextField
          name="email"
          label={AUTH_LABELS.EMAIL}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          status={
            !email?.length ? undefined : form.formState.errors.email ? 'error' : 'valid'
          }
          error={form.formState.errors.email}
          autoComplete="email"
        />

        <AuthFooter
          leftButtonLabel={AUTH_LABELS.SKIP}
          onLeftButtonPress={onSkip}
          rightButtonLabel={AUTH_LABELS.NEXT}
          onRightButtonPress={form.handleSubmit(onSubmit)}
          rightButtonProps={{
            disabled: !!form.formState.errors.email || !email || isLoading,
          }}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default SignupEmail
