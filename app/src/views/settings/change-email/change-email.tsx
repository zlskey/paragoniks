import type { WhoamiUserResponse } from 'src/api/endpoints/user/user.api.types'
import AuthTextField from '@components/auth-textfield'
import Button from '@components/button'
import Flex from '@components/flex'
import Typography from '@components/typography'
import Wrapper from '@components/wrapper'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { changeEmail } from 'src/api/endpoints/user/user.api'
import useIsEmailTaken from 'src/views/auth/hooks/use-is-email-taken'
import * as yup from 'yup'

const defaultValues = {
  email: '',
}

const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email('Nieprawidłowy format email')
    .nullable()
    .notRequired(),
})

function ChangeEmail() {
  const addNotification = useNotificationContext()
  const formState = useForm({
    defaultValues,
    resolver: yupResolver(emailSchema),
    mode: 'onChange',
  })

  const newEmail = formState.watch('email')

  const queryClient = useQueryClient()

  const { data: isEmailTaken, isLoading } = useIsEmailTaken(newEmail ?? '')

  const { mutate: onSubmit, isPending } = useMutation({
    mutationKey: ['user', 'email'],
    mutationFn: changeEmail,
    onSuccess: (user) => {
      queryClient.setQueryData(['user', 'whoami'], old => ({
        ...(old as WhoamiUserResponse),
        user,
      }))
      formState.reset()
      router.back()
      addNotification('Mail z linkiem do potwierdzenia został wysłany', 'success')
    },
    onError: (err: any) => {
      if (err.response.data.error.message) {
        formState.setError('email', {
          type: 'manual',
          message: err.response.data.error.message,
        })
        return
      }
      addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error')
    },
  })

  useEffect(() => {
    if (isEmailTaken) {
      formState.setError('email', { type: 'manual', message: 'Podany email jest już zajęty' })
    }
    else if (formState.formState.errors.email?.type === 'manual') {
      formState.clearErrors('email')
    }
  }, [isEmailTaken])

  const buttonDisabled = !newEmail || isPending

  return (
    <FormProvider {...formState}>
      <Wrapper>
        <Flex direction="column" alignContent="stretch" nativeFlex spacing={2}>
          <Typography>
            Zmień swój adres email. Nowy email będzie wymagał potwierdzenia.
          </Typography>

          <AuthTextField
            name="email"
            label="Nowy email"
            autoFocus
            fullWidth
            error={formState.formState.errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            status={formState.formState.errors.email ? 'error' : 'valid'}
            isLoading={isLoading}
          />
        </Flex>

        <Button
          onPress={formState.handleSubmit(data => onSubmit({ email: data.email ?? '' }))}
          isDisabled={buttonDisabled}
        >
          Zmień
        </Button>
      </Wrapper>
    </FormProvider>
  )
}

export default ChangeEmail
