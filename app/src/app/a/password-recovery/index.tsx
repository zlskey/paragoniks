import AuthFooter from '@components/auth-footer'
import AuthWrapper from '@components/auth-wrapper'
import UsernameTextField from '@components/username-text-field'
import { router } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'

const defaultValues = {
  username: '',
}

function PasswordRecovery() {
  const form = useForm({ defaultValues })

  function onSubmit(data: typeof defaultValues) {
    // TODO: Implement password recovery logic
    console.log('Password recovery for:', data.username)
    // Navigate to code verification screen
    router.push('/a/password-recovery/code')
  }

  return (
    <FormProvider {...form}>
      <AuthWrapper
        title="Odzyskaj hasło"
        subtitle="Wpisz swoją nazwę użytkownika lub email powiązany z kontem, aby odzyskać dostęp do swojego konta."
      >
        <UsernameTextField error={form.formState.errors.username} />

        <AuthFooter
          rightButtonLabel="Dalej"
          onRightButtonPress={form.handleSubmit(onSubmit)}
        />
      </AuthWrapper>
    </FormProvider>
  )
}

export default PasswordRecovery
