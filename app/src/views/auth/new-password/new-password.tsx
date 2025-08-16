import type { NewPasswordFormData } from '../types'
import AuthFooter from '@components/auth-flow/auth-footer'
import AuthWrapper from '@components/auth-flow/auth-wrapper'
import AuthTextField from '@components/auth-textfield'
import { userSchema } from '@helpers/utils/password-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { useAuthNavigation } from '../hooks'
import { AUTH_LABELS, AUTH_TITLES, DEFAULT_FORM_VALUES } from '../utils'

function NewPassword() {
  const form = useForm<NewPasswordFormData>({
    defaultValues: DEFAULT_FORM_VALUES.NEW_PASSWORD,
    resolver: yupResolver(userSchema.pick(['password', 'repeatPassword'])),
  })
  const { navigateToLoginFromPasswordReset } = useAuthNavigation()

  function onSubmit(data: NewPasswordFormData) {
    // TODO: Implement password update logic
    console.log('New password:', data.password)
    // After successful password update, redirect to login
    navigateToLoginFromPasswordReset()
  }

  return (
    <AuthWrapper
      title={AUTH_TITLES.NEW_PASSWORD}
      subtitle={AUTH_TITLES.NEW_PASSWORD_SUBTITLE}
    >
      <FormProvider {...form}>
        <AuthTextField
          name="password"
          label={AUTH_LABELS.NEW_PASSWORD}
          secureTextEntry
          error={form.formState.errors.password}
        />

        <AuthTextField
          name="repeatPassword"
          label={AUTH_LABELS.REPEAT_NEW_PASSWORD}
          secureTextEntry
          error={form.formState.errors.repeatPassword}
        />

        <AuthFooter
          rightButtonLabel={AUTH_LABELS.SET_PASSWORD}
          onRightButtonPress={form.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default NewPassword
