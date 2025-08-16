import AuthFooter from '@components/auth-footer'
import AuthWrapper from '@components/auth-wrapper'
import TextField from '@components/text-field'
import UsernameTextField from '@components/username-text-field'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { saveToStorage } from '@helpers/utils/storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { loginUser } from 'src/api/endpoints/user/user.api'

const defaultValues = {
  password: '',
}

function LoginPassword() {
  const { username } = useLocalSearchParams<{ username: string }>()
  const addNotification = useNotificationContext()
  const form = useForm({ defaultValues })
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: loginUser,
    onSuccess: async (data) => {
      await saveToStorage('token', data.token)
      await queryClient.invalidateQueries({ queryKey: ['user', 'whoami'] })
      addNotification(`Witaj ponownie ${data.user.username} ❣️`, 'success')
    },
    onError: (err: any) => {
      addNotification(err.response.data.error.message ?? SOMETHING_WENT_WRONG_MESSAGE, 'error')
    },
  })

  function onSubmit(data: typeof defaultValues) {
    if (!username) {
      addNotification('Nazwa użytkownika jest wymagana', 'error')
      return
    }

    mutate({
      username,
      password: data.password,
    })
  }

  function onPasswordRecoveryPress() {
    router.replace('/a/password-recovery')
  }

  return (
    <AuthWrapper title="Zaloguj się">
      <FormProvider {...form}>
        <UsernameTextField
          labelAlwaysOnTop
          readOnly
          name="username"
          label="Nazwa użytkownika"
          defaultValue={username}
          error={undefined}
        />

        <TextField
          name="password"
          label="Hasło"
          error={form.formState.errors.password}
        />

        <AuthFooter
          leftButtonLabel="Zapomniałeś hasła?"
          rightButtonLabel="Zaloguj się"
          onLeftButtonPress={onPasswordRecoveryPress}
          onRightButtonPress={form.handleSubmit(onSubmit)}
          rightButtonProps={{ disabled: isPending }}
          leftButtonProps={{ disabled: true }}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default LoginPassword
