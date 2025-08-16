import type { AuthParams, SignupPasswordFormData } from '../types'
import AuthFooter from '@components/auth-flow/auth-footer'
import AuthWrapper from '@components/auth-flow/auth-wrapper'
import AuthTextField from '@components/auth-textfield'
import { passwordSchema } from '@helpers/utils/password-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocalSearchParams } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { useAuthNavigation } from '../hooks'
import { AUTH_LABELS, AUTH_TITLES, DEFAULT_FORM_VALUES } from '../utils'

function SignupPassword() {
  const { username } = useLocalSearchParams() as AuthParams
  const { navigateToSignupProfile } = useAuthNavigation()
  const form = useForm<SignupPasswordFormData>({
    defaultValues: DEFAULT_FORM_VALUES.SIGNUP_PASSWORD,
    resolver: yupResolver(passwordSchema),
    mode: 'onChange',
  })

  const password = form.watch('password')
  const repeatPassword = form.watch('repeatPassword')

  function onSubmit(data: SignupPasswordFormData) {
    if (username) {
      navigateToSignupProfile(username, data.password)
    }
  }

  console.log(form.formState.errors.password)

  return (
    <AuthWrapper title={AUTH_TITLES.SIGNUP}>
      <FormProvider {...form}>
        <AuthTextField
          name="password"
          label={AUTH_LABELS.PASSWORD}
          secureTextEntry
          status={!password.length ? undefined : form.formState.errors.password ? 'error' : 'valid'}
          error={form.formState.errors.password}
        />

        <AuthTextField
          name="repeatPassword"
          label={AUTH_LABELS.REPEAT_PASSWORD}
          secureTextEntry
          status={!repeatPassword.length ? undefined : form.formState.errors.repeatPassword ? 'error' : 'valid'}
          error={form.formState.errors.repeatPassword}
        />

        <AuthFooter
          rightButtonLabel={AUTH_LABELS.NEXT}
          onRightButtonPress={form.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default SignupPassword
