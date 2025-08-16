import type { AuthParams, LoginPasswordFormData } from '../types'
import AuthFooter from '@components/auth-flow/auth-footer'
import AuthWrapper from '@components/auth-flow/auth-wrapper'
import AuthTextField from '@components/auth-textfield'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useLocalSearchParams } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { useAuthNavigation, useLogin } from '../hooks'
import { AUTH_LABELS, AUTH_MESSAGES, AUTH_TITLES, DEFAULT_FORM_VALUES } from '../utils'

function LoginPassword() {
  const { username } = useLocalSearchParams() as AuthParams
  const addNotification = useNotificationContext()
  const form = useForm<LoginPasswordFormData>({ defaultValues: DEFAULT_FORM_VALUES.LOGIN_PASSWORD(username!) })
  const { navigateToPasswordRecovery } = useAuthNavigation()
  const { mutate: login, isPending } = useLogin()

  function onSubmit(data: LoginPasswordFormData) {
    if (!username) {
      addNotification(AUTH_MESSAGES.USERNAME_REQUIRED, 'error')
      return
    }

    login({
      username,
      password: data.password,
    })
  }

  return (
    <AuthWrapper title={AUTH_TITLES.LOGIN}>
      <FormProvider {...form}>
        <AuthTextField
          labelAlwaysOnTop
          readOnly
          name="username"
          label={AUTH_LABELS.USERNAME}
          defaultValue={username}
          autoCorrect={false}
          style={{ textTransform: 'lowercase' }}
          error={undefined}
        />

        <AuthTextField
          name="password"
          label={AUTH_LABELS.PASSWORD}
          error={form.formState.errors.password}
          inputMode="text"
          autoComplete="password"
          secureTextEntry
        />

        <AuthFooter
          leftButtonLabel={AUTH_LABELS.FORGOT_PASSWORD}
          rightButtonLabel={AUTH_LABELS.SIGN_IN}
          onLeftButtonPress={navigateToPasswordRecovery}
          onRightButtonPress={form.handleSubmit(onSubmit)}
          rightButtonProps={{ disabled: isPending }}
          // @todo - implement password recovery
          leftButtonProps={{ style: { display: 'none' } }}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default LoginPassword
