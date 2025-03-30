import type { WhoamiUserResponse } from 'src/api/endpoints/user/user.api.types'
import Button from '@components/button'
import Flex from '@components/flex'
import Typography from '@components/typography'
import UsernameTextField from '@components/username-text-field'
import Wrapper from '@components/wrapper'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { changeUsername } from 'src/api/endpoints/user/user.api'

const defaultValues = {
  username: '',
}

function ChangeUsername() {
  const addNotification = useNotificationContext()
  const formState = useForm({
    defaultValues,
  })

  const newUsername = formState.watch('username')

  const queryClient = useQueryClient()

  const { mutate: onSubmit, isPending } = useMutation({
    mutationKey: ['user', 'username'],
    mutationFn: changeUsername,
    onSuccess: (user) => {
      queryClient.setQueryData(['user', 'whoami'], old => ({
        ...(old as WhoamiUserResponse),
        user,
      }))
      formState.reset()
      router.back()
      addNotification('Nazwa zmieniona', 'success')
    },
    onError: (err: any) => {
      if (err.response.data.error.message) {
        formState.setError('username', {
          type: 'manual',
          message: err.response.data.error.message,
        })
        return
      }
      addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error')
    },
  })

  const buttonDisabled = !newUsername || isPending

  return (
    <FormProvider {...formState}>
      <Wrapper>
        <Flex direction="column" alignContent="stretch" nativeFlex spacing={2}>
          <Typography>
            Spersonalizuj swoją nazwę, aby znajomi mogli Cię znaleźć.
          </Typography>

          <UsernameTextField
            autoFocus
            fullWidth
            error={formState.formState.errors.username}
          />
        </Flex>

        <Button
          onPress={formState.handleSubmit(data => onSubmit(data))}
          isDisabled={buttonDisabled}
        >
          Zmień
        </Button>
      </Wrapper>
    </FormProvider>
  )
}

export default ChangeUsername
