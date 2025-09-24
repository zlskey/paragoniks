import type { SignupFormData } from '../types'
import AuthFooter from '@components/auth-flow/auth-footer'
import AuthWrapper from '@components/auth-flow/auth-wrapper'
import AuthTextField from '@components/auth-textfield'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAuthNavigation } from '../hooks'
import useIsUsernameTaken from '../hooks/use-is-username-taken'
import { AUTH_LABELS, AUTH_TITLES, DEFAULT_FORM_VALUES } from '../utils'

export const usernameSchema = yup.object().shape({
  username: yup
    .string()
    .lowercase()
    .required('Nazwa użytkownika jest wymagana')
    .matches(/^[a-z0-9_]+$/, 'Nazwa użytkownika może zawierać tylko małe litery, cyfry i _')
    .min(3, 'Nazwa użytkownika musi mieć co najmniej 3 znaki')
    .max(32, 'Nazwa użytkownika może mieć maksymalnie 32 znaki'),
})

function Signup() {
  const form = useForm<SignupFormData>({
    defaultValues: DEFAULT_FORM_VALUES.SIGNUP,
    resolver: yupResolver(usernameSchema),
    mode: 'onChange',
  })
  const username = form.watch('username')

  const { navigateToSignupEmail } = useAuthNavigation()

  const { data: isUsernameTaken, isLoading } = useIsUsernameTaken(username)

  function onSubmit(data: SignupFormData) {
    navigateToSignupEmail(data.username)
  }

  const shouldGoForwardButtonBeDisabled = isLoading || !!form.formState.errors.username || !username

  useEffect(() => {
    console.log('form.formState.errors', form)
  }, [form.formState.errors])

  return (
    <AuthWrapper title={AUTH_TITLES.SIGNUP}>
      <FormProvider {...form}>
        <AuthTextField
          name="username"
          label={AUTH_LABELS.USERNAME}
          placeholder="Wprowadź nazwę użytkownika"
          autoCorrect={false}
          status={
            form.formState.errors.username
              ? 'error'
              : isUsernameTaken === true
                ? 'error'
                : isUsernameTaken === false
                  ? 'valid'
                  : undefined
          }
          isLoading={isLoading}
          error={
            form.formState.errors.username
            ?? (isUsernameTaken === true ? { message: 'Podana nazwa użytkownika lub email, jest już zajęty', type: 'custom' } : undefined)
          }
          formatValue={value => value.toLowerCase()}
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
