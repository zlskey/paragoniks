import Flex from '@components/flex'
import Paper from '@components/paper'

import TextField from '@components/text-field'
import Typography from '@components/typography'
import UsernameTextField from '@components/username-text-field'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { loginUser } from 'src/api/endpoints/user/user.api'
import { colors } from 'src/app/styles'

const defaultValues = {
  username: '',
  password: '',
}

function LoginForm() {
  const addNotification = useNotificationContext()
  const formState = useForm({ defaultValues })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['user', 'whoami'], data)
      addNotification(`Witaj ponownie ${data.user.username} ❣️`, 'success')
    },
    onError: (err: any) => {
      addNotification(err.response.data.error.message ?? SOMETHING_WENT_WRONG_MESSAGE, 'error')
    },
  })

  return (
    <Paper>
      <FormProvider {...formState}>
        <Flex direction="column" alignContent="stretch" p={2} spacing={2}>
          <Typography variant="title">Zaloguj się</Typography>

          <UsernameTextField style={{ backgroundColor: colors.background }} />

          <TextField
            name="password"
            label="Hasło"
            secureTextEntry
            style={{ backgroundColor: colors.background }}
          />

          <Flex justifyContent="center">
            <TouchableOpacity
              onPress={formState.handleSubmit(data => mutate(data))}
            >
              <Typography>Zaloguj się</Typography>
            </TouchableOpacity>
          </Flex>
        </Flex>
      </FormProvider>
    </Paper>
  )
}

export default LoginForm
