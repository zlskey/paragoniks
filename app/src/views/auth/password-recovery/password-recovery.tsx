import type { PasswordRecoveryFormData } from '../types'
import AuthFooter from '@components/auth-flow/auth-footer'
import AuthWrapper from '@components/auth-flow/auth-wrapper'
import AuthTextField from '@components/auth-textfield'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { passwordRecoveryService } from 'src/api'
import { useAuthNavigation } from '../hooks'
import useIsUsernameTakenOrEmailTaken from '../hooks/use-is-username-or-email-taken'
import { AUTH_LABELS, AUTH_TITLES, DEFAULT_FORM_VALUES } from '../utils'

function PasswordRecovery() {
  const addNotification = useNotificationContext()

  const form = useForm<PasswordRecoveryFormData>({ defaultValues: DEFAULT_FORM_VALUES.PASSWORD_RECOVERY })
  const { navigateToPasswordRecoveryCode } = useAuthNavigation()

  const usernameOrEmail = form.watch('usernameOrEmail')

  const { mutate: handleSendPasswordRecoveryEmail, isPending: isSendPasswordRecoveryEmailPending } = useMutation({
    mutationFn: passwordRecoveryService.sendPasswordRecoveryEmail,
    onSuccess: (data) => {
      navigateToPasswordRecoveryCode(data.userId, usernameOrEmail)
    },
    onError: (err: any) => {
      addNotification(err.response.data.error.message, 'error')
    },
  })

  const {
    data: isUsernameOrEmailRegistered,
    isFetching: isUsernameOrEmailRegisteredFetching,
  } = useIsUsernameTakenOrEmailTaken(usernameOrEmail, true)

  useEffect(() => {
    if (isUsernameOrEmailRegistered === true) {
      form.clearErrors('usernameOrEmail')
    }
    if (isUsernameOrEmailRegistered === false) {
      form.setError(
        'usernameOrEmail',
        {
          message: 'Podana nazwa użytkownika lub email, nie jest przypisany do żadnego konta',
        },
      )
    }
  }, [isUsernameOrEmailRegistered, form])

  function onSubmit(data: PasswordRecoveryFormData) {
    handleSendPasswordRecoveryEmail({ usernameOrEmail: data.usernameOrEmail })
  }

  const shouldGoForwardButtonBeDisabled = isUsernameOrEmailRegisteredFetching || isSendPasswordRecoveryEmailPending || !!form.formState.errors.usernameOrEmail || !usernameOrEmail

  return (
    <FormProvider {...form}>
      <AuthWrapper
        title={AUTH_TITLES.PASSWORD_RECOVERY}
        subtitle={AUTH_TITLES.PASSWORD_RECOVERY_SUBTITLE}
      >
        <AuthTextField
          name="usernameOrEmail"
          label={AUTH_LABELS.USERNAME_OR_EMAIL}
          autoCorrect={false}
          status={isUsernameOrEmailRegistered === undefined ? undefined : isUsernameOrEmailRegistered ? 'valid' : 'error'}
          error={form.formState.errors.usernameOrEmail}
          autoComplete="username"
          isLoading={isUsernameOrEmailRegisteredFetching || isSendPasswordRecoveryEmailPending}
          formatValue={value => value.toLowerCase()}
        />

        <AuthFooter
          rightButtonLabel={AUTH_LABELS.NEXT}
          onRightButtonPress={form.handleSubmit(onSubmit)}
          rightButtonProps={{ disabled: shouldGoForwardButtonBeDisabled }}
        />
      </AuthWrapper>
    </FormProvider>
  )
}

export default PasswordRecovery
