import AuthFooter from '@components/auth-footer'
import AuthWrapper from '@components/auth-wrapper'
import UsernameTextField from '@components/username-text-field'
import { router } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'

const defaultValues = {
  username: '',
}

function Login() {
  const form = useForm({ defaultValues })

  function onSubmit(data: typeof defaultValues) {
    router.push({
      pathname: '/a/login/password',
      params: { username: data.username },
    })
  }

  function onPasswordRecoveryPress() {
    router.replace('/a/password-recovery')
  }

  return (
    <AuthWrapper title="Zaloguj się" subtitle="Wpisz swoją nazwę użytkownika lub email powiązany z kontem, aby odzyskać dostęp do swojego konta.">
      <FormProvider {...form}>
        <UsernameTextField error={form.formState.errors.username} />

        <AuthFooter
          leftButtonLabel="Zapomniałeś hasła?"
          rightButtonLabel="Dalej"
          onLeftButtonPress={onPasswordRecoveryPress}
          onRightButtonPress={form.handleSubmit(onSubmit)}
          leftButtonProps={{ disabled: true }}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default Login
