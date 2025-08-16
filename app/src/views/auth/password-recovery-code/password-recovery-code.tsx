import type { PasswordRecoveryCodeFormData } from '../types'
import AuthFooter from '@components/auth-flow/auth-footer'
import AuthWrapper from '@components/auth-flow/auth-wrapper'
import AuthTextField from '@components/auth-textfield'
import { FormProvider, useForm } from 'react-hook-form'
import { useAuthNavigation } from '../hooks'
import { AUTH_LABELS, AUTH_TITLES, DEFAULT_FORM_VALUES } from '../utils'

function PasswordRecoveryCode() {
  const form = useForm<PasswordRecoveryCodeFormData>({ defaultValues: DEFAULT_FORM_VALUES.PASSWORD_RECOVERY_CODE })
  const { navigateToNewPassword } = useAuthNavigation()

  function onSubmit(data: PasswordRecoveryCodeFormData) {
    console.log('Verification code:', data.code)
    navigateToNewPassword()
  }

  function onResendCode() {
    // TODO: Implement resend code logic
    console.log('Resending verification code')
  }

  return (
    <AuthWrapper
      title={AUTH_TITLES.CODE_SENT}
      subtitle={AUTH_TITLES.CODE_SENT_SUBTITLE}
    >
      <FormProvider {...form}>
        <AuthTextField
          name="code"
          label={AUTH_LABELS.VERIFICATION_CODE}
          error={form.formState.errors.code}
        />

        <AuthFooter
          leftButtonLabel={AUTH_LABELS.RESEND_CODE}
          rightButtonLabel={AUTH_LABELS.NEXT}
          onLeftButtonPress={onResendCode}
          onRightButtonPress={form.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default PasswordRecoveryCode
