import type { SignupFormData } from '../types'
import AuthFooter from '@components/auth-flow/auth-footer'
import AuthWrapper from '@components/auth-flow/auth-wrapper'
import AuthTextField from '@components/auth-textfield'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useAuthNavigation } from '../hooks'
import useIsUsernameTaken from '../hooks/use-is-username-taken'
import { AUTH_LABELS, AUTH_TITLES, DEFAULT_FORM_VALUES } from '../utils'

function Signup() {
  const form = useForm<SignupFormData>({ defaultValues: DEFAULT_FORM_VALUES.SIGNUP })
  const username = form.watch('username')

  const { navigateToSignupPassword } = useAuthNavigation()

  const { data: isUsernameTaken, isLoading } = useIsUsernameTaken(username)

  function onSubmit(data: SignupFormData) {
    navigateToSignupPassword(data.username)
  }

  const shouldGoForwardButtonBeDisabled = isLoading || !!form.formState.errors.username || !username

  useEffect(() => {
    if (isUsernameTaken === false) {
      form.clearErrors('username')
    }
    if (isUsernameTaken === true) {
      form.setError('username', { message: 'Podana nazwa użytkownika lub email, jest już zajęty' })
    }
  }, [isUsernameTaken, form])

  return (
    <AuthWrapper title={AUTH_TITLES.SIGNUP}>
      <FormProvider {...form}>
        <AuthTextField
          name="username"
          label={AUTH_LABELS.USERNAME}
          placeholder="Wprowadź nazwę użytkownika"
          autoCorrect={false}
          style={{ textTransform: 'lowercase' }}
          status={isUsernameTaken === undefined ? undefined : isUsernameTaken ? 'error' : 'valid'}
          isLoading={isLoading}
          error={form.formState.errors.username}
        />

        <AuthFooter
          rightButtonLabel={AUTH_LABELS.NEXT}
          onRightButtonPress={form.handleSubmit(onSubmit)}
          rightButtonProps={{ disabled: shouldGoForwardButtonBeDisabled }}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default Signup
