import AuthFooter from '@components/auth-footer'
import AuthWrapper from '@components/auth-wrapper'
import TextField from '@components/text-field'
import { router } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'

const defaultValues = {
  code: '',
}

function PasswordRecoveryCode() {
  const form = useForm({ defaultValues })

  function onSubmit(data: typeof defaultValues) {
    console.log('Verification code:', data.code)
    router.replace('/a/password-recovery/new-password')
  }

  function onResendCode() {
    // TODO: Implement resend code logic
    console.log('Resending verification code')
  }

  return (
    <AuthWrapper
      title="Wysłaliśmy do Ciebie kod"
      subtitle="Sprawdź swoją skrzynkę i wklej kod, aby odzyskać dostęp do swojego konta."
    >
      <FormProvider {...form}>
        <TextField
          name="code"
          label="Kod"
          error={form.formState.errors.code}
        />

        <AuthFooter
          leftButtonLabel="Wyślij ponownie"
          rightButtonLabel="Dalej"
          onLeftButtonPress={onResendCode}
          onRightButtonPress={form.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default PasswordRecoveryCode
