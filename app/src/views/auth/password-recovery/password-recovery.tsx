import type { PasswordRecoveryFormData } from '../types'
import AuthFooter from '@components/auth-flow/auth-footer'
import AuthWrapper from '@components/auth-flow/auth-wrapper'
import AuthTextField from '@components/auth-textfield'
import { FormProvider, useForm } from 'react-hook-form'
import { useAuthNavigation } from '../hooks'
import { AUTH_LABELS, AUTH_TITLES, DEFAULT_FORM_VALUES } from '../utils'

function PasswordRecovery() {
  const form = useForm<PasswordRecoveryFormData>({ defaultValues: DEFAULT_FORM_VALUES.PASSWORD_RECOVERY })
  const { navigateToPasswordRecoveryCode } = useAuthNavigation()

  function onSubmit(data: PasswordRecoveryFormData) {
    // TODO: Implement password recovery logic
    console.log('Password recovery for:', data.username)
    navigateToPasswordRecoveryCode()
  }

  return (
    <FormProvider {...form}>
      <AuthWrapper
        title={AUTH_TITLES.PASSWORD_RECOVERY}
        subtitle={AUTH_TITLES.PASSWORD_RECOVERY_SUBTITLE}
      >
        <AuthTextField
          name="username"
          label={AUTH_LABELS.USERNAME}
          autoCorrect={false}
          style={{ textTransform: 'lowercase' }}
          error={form.formState.errors.username}
        />

        <AuthFooter
          rightButtonLabel={AUTH_LABELS.NEXT}
          onRightButtonPress={form.handleSubmit(onSubmit)}
        />
      </AuthWrapper>
    </FormProvider>
  )
}

export default PasswordRecovery
