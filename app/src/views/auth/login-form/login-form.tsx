import Flex from '@components/flex'
import Paper from '@components/paper'

import TextField from '@components/text-field'
import Typography from '@components/typography'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { loginUser } from 'src/api/endpoints/user/user.api'
import { colors } from 'src/app/styles'

const defaultValues = {
  username: '',
  password: '',
}

function LoginForm() {
  const formState = useForm({ defaultValues })

  const [error, setError] = useState('')

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['user', 'whoami'], data)
    },
    onError: (err: any) => {
      if (err.response.data.error.message) {
        setError(err.response.data.error.message)
      }
    },
  })

  return (
    <Paper>
      <FormProvider {...formState}>
        <Flex direction="column" alignContent="stretch" p={2} spacing={2}>
          <Typography variant="title">Zaloguj się</Typography>

          {error && (
            <Paper styles={{ backgroundColor: colors.red }}>
              <Flex p={1}>
                <Typography styles={{ color: colors.text }}>{error}</Typography>
              </Flex>
            </Paper>
          )}

          <TextField
            name="username"
            label="Nazwa użytkownika"
            style={{ backgroundColor: colors.background }}
          />

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
