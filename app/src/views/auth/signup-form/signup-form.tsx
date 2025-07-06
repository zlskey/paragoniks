import Flex from '@components/flex'
import Paper from '@components/paper'

import TextField from '@components/text-field'
import Typography from '@components/typography'
import UsernameTextField from '@components/username-text-field'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { userSchema } from '@helpers/utils/password-schema'
import { saveToStorage } from '@helpers/utils/storage'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { signupUser } from 'src/api/endpoints/user/user.api'
import { colors } from 'src/app/styles'

const defaultValues = {
  username: '',
  password: '',
  repeatPassword: '',
}

function SignupForm() {
  const addNotification = useNotificationContext()
  const form = useForm({ defaultValues, resolver: yupResolver(userSchema) })

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['auth', 'signup'],
    mutationFn: signupUser,
    onSuccess: async (data) => {
      await saveToStorage('token', data.token)
      await queryClient.invalidateQueries({ queryKey: ['user', 'whoami'] })
      addNotification(`Witamy ${data.user.username}!`, 'success')
    },
    onError: (err: any) => {
      addNotification(err.response.data.error.message ?? SOMETHING_WENT_WRONG_MESSAGE, 'error')
    },
  })

  return (
    <Paper>
      <FormProvider {...form}>
        <Flex direction="column" alignContent="stretch" p={2} spacing={2}>
          <Typography variant="title">Zarejestruj się</Typography>

          <UsernameTextField
            error={form.formState.errors.username}
            style={{ backgroundColor: colors.background }}
          />

          <TextField
            name="password"
            label="Hasło"
            secureTextEntry
            error={form.formState.errors.password}
            style={{ backgroundColor: colors.background }}
          />

          <TextField
            name="repeatPassword"
            label="Powtórz hasło"
            secureTextEntry
            error={form.formState.errors.repeatPassword}
            style={{ backgroundColor: colors.background }}
          />

          <Flex justifyContent="center">
            <TouchableOpacity
              onPress={form.handleSubmit(data => mutate(data))}
            >
              <Typography>Zarejestruj się</Typography>
            </TouchableOpacity>
          </Flex>
        </Flex>
      </FormProvider>
    </Paper>
  )
}

export default SignupForm
