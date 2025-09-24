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
  const { usernameOrEmail } = useLocalSearchParams() as AuthParams
  const addNotification = useNotificationContext()
  const form = useForm<LoginPasswordFormData>({ defaultValues: DEFAULT_FORM_VALUES.LOGIN_PASSWORD(usernameOrEmail!) })
  const { navigateToPasswordRecovery } = useAuthNavigation()
  const { mutate: login, isPending } = useLogin()

  function onSubmit(data: LoginPasswordFormData) {
    if (!usernameOrEmail) {
      addNotification(AUTH_MESSAGES.USERNAME_REQUIRED, 'error')
      return
    }

    login({
      usernameOrEmail,
      password: data.password,
    })
  }

  return (
    <AuthWrapper title={AUTH_TITLES.LOGIN}>
      <FormProvider {...form}>
        <AuthTextField
          labelAlwaysOnTop
          readOnly
          name="usernameOrEmail"
          label={AUTH_LABELS.USERNAME}
          defaultValue={usernameOrEmail}
          value={usernameOrEmail}
          autoCorrect={false}
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
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default LoginPassword
