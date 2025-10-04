import type { AuthParams, PasswordRecoveryCodeFormData } from '../types'
import AuthFooter from '@components/auth-flow/auth-footer'
import AuthWrapper from '@components/auth-flow/auth-wrapper'
import AuthTextField from '@components/auth-textfield'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { saveToStorage } from '@helpers/utils/storage'
import { useMutation } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { passwordRecoveryService } from 'src/api'
import { useAuthNavigation } from '../hooks'
import { AUTH_LABELS, AUTH_TITLES, DEFAULT_FORM_VALUES } from '../utils'

function PasswordRecoveryCode() {
  const addNotification = useNotificationContext()
  const form = useForm<PasswordRecoveryCodeFormData>({ defaultValues: DEFAULT_FORM_VALUES.PASSWORD_RECOVERY_CODE })
  const { userId, usernameOrEmail } = useLocalSearchParams() as AuthParams

  const { navigateToNewPassword } = useAuthNavigation()

  const { mutate: handlePasswordRecoveryCode, isPending: isPasswordRecoveryCodePending } = useMutation({
    mutationFn: passwordRecoveryService.passwordRecoveryCode,
    onSuccess: async (data) => {
      await saveToStorage('token', data.token)
      navigateToNewPassword()
    },
    onError: (err: any) => {
      addNotification(err.response.data.error.message, 'error')
    },
  })

  const { mutate: handleSendPasswordRecoveryEmail, isPending: isSendPasswordRecoveryEmailPending } = useMutation({
    mutationFn: () => passwordRecoveryService.sendPasswordRecoveryEmail({ usernameOrEmail: usernameOrEmail as string }),
    onSuccess: () => {
      addNotification('Kod do resetowania hasła został wysłany ponownie', 'success')
    },
    onError: (err: any) => {
      addNotification(err.response.data.error.message, 'error')
    },
  })

  function onSubmit(data: PasswordRecoveryCodeFormData) {
    if (!userId) {
      return
    }
    handlePasswordRecoveryCode({ code: data.code, userId })
  }

  const isPending = isPasswordRecoveryCodePending || isSendPasswordRecoveryEmailPending

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
          onLeftButtonPress={handleSendPasswordRecoveryEmail}
          leftButtonProps={{ loading: isPending, disabled: isPending }}
          rightButtonLabel={AUTH_LABELS.NEXT}
          onRightButtonPress={form.handleSubmit(onSubmit)}
          rightButtonProps={{ loading: isPending, disabled: isPending }}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default PasswordRecoveryCode
