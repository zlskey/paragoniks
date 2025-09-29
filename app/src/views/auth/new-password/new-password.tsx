import type { NewPasswordFormData } from '../types'
import AuthFooter from '@components/auth-flow/auth-footer'
import AuthWrapper from '@components/auth-flow/auth-wrapper'
import AuthTextField from '@components/auth-textfield'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { userSchema } from '@helpers/utils/password-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { passwordRecoveryService } from 'src/api'
import { AUTH_LABELS, AUTH_TITLES, DEFAULT_FORM_VALUES } from '../utils'

function NewPassword() {
  const form = useForm<NewPasswordFormData>({
    defaultValues: DEFAULT_FORM_VALUES.NEW_PASSWORD,
    resolver: yupResolver(userSchema.pick(['password', 'repeatPassword'])),
  })
  const addNotification = useNotificationContext()

  const queryClient = useQueryClient()

  const { mutate: handleUpdatePassword, isPending } = useMutation({
    mutationKey: ['user', 'password'],
    mutationFn: passwordRecoveryService.updatePassword,
    onSuccess: async () => {
      addNotification('Hasło zostało zmienione', 'success')
      await queryClient.invalidateQueries({ queryKey: ['user', 'whoami'] })
      router.replace('/home')
    },
    onError: (err: any) => {
      if (err.response.data.error.message) {
        form.setError('password', {
          type: 'manual',
          message: err.response.data.error.message,
        })
        return
      }
      addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error')
    },
  })

  function onSubmit(data: NewPasswordFormData) {
    handleUpdatePassword(data)
  }

  useEffect(() => {
    console.log(form.formState.errors)
  }, [form.formState.errors])

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
          status={form.formState.errors.password ? 'error' : 'valid'}
        />

        <AuthTextField
          name="repeatPassword"
          label={AUTH_LABELS.REPEAT_NEW_PASSWORD}
          secureTextEntry
          error={form.formState.errors.repeatPassword}
          status={form.formState.errors.repeatPassword ? 'error' : 'valid'}
        />

        <AuthFooter
          rightButtonLabel={AUTH_LABELS.SET_PASSWORD}
          onRightButtonPress={form.handleSubmit(onSubmit)}
          rightButtonProps={{ disabled: isPending }}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default NewPassword
