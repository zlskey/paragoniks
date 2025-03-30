import Button from '@components/button'

import Flex from '@components/flex'

import TextField from '@components/text-field'
import Wrapper from '@components/wrapper'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { passwordSchema } from '@helpers/utils/password-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { changePassword } from 'src/api/endpoints/user/user.api'
import * as yup from 'yup'

export const passwordSchemaWithCurrent = yup
  .object()
  .shape({
    currentPassword: yup.string().required('Current password is required'),
  })
  .concat(passwordSchema)

function ChangePassword() {
  const addNotification = useNotificationContext()

  const formState = useForm({
    defaultValues: {
      currentPassword: '',
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(passwordSchemaWithCurrent),
  })

  const { mutate: onSubmit, isPending } = useMutation({
    mutationKey: ['user', 'password'],
    mutationFn: changePassword,
    onSuccess: () => {
      formState.reset()
      router.back()
      addNotification('Hasło zostało zmienione', 'success')
    },
    onError: (err: any) => {
      if (err.response.data.error.message) {
        formState.setError('password', {
          type: 'manual',
          message: err.response.data.error.message,
        })
        return
      }
      addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error')
    },
  })

  const buttonDisabled = isPending
    || formState.formState.isSubmitting
    || !!formState.formState.errors.password

  return (
    <FormProvider {...formState}>
      <Wrapper>
        <Flex direction="column" alignContent="stretch" spacing={4} nativeFlex>
          <TextField
            name="currentPassword"
            label="Stare hasło"
            error={formState.formState.errors.currentPassword}
            secureTextEntry
            autoFocus
          />

          <Flex direction="column" alignContent="stretch" spacing={2}>
            <TextField
              name="password"
              label="Nowe hasło"
              error={formState.formState.errors.password}
              secureTextEntry
            />
            <TextField
              name="repeatPassword"
              label="Powtórz nowe hasło"
              error={formState.formState.errors.repeatPassword}
              secureTextEntry
            />
          </Flex>
        </Flex>

        <Button
          onPress={formState.handleSubmit(({ currentPassword, password }) => {
            onSubmit({ currentPassword, newPassword: password })
          })}
          isDisabled={buttonDisabled}
        >
          Zmień
        </Button>
      </Wrapper>
    </FormProvider>
  )
}

export default ChangePassword
//
