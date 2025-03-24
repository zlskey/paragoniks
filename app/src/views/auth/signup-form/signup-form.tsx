import Flex from '@components/flex'
import Paper from '@components/paper'

import TextField from '@components/text-field'
import Typography from '@components/typography'
import { userSchema } from '@helpers/utils/password-schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
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
  const form = useForm({ defaultValues, resolver: yupResolver(userSchema) })

  const [error, setError] = useState('')

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['auth', 'signup'],
    mutationFn: signupUser,
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
      <FormProvider {...form}>
        <Flex direction="column" alignContent="stretch" p={2} spacing={2}>
          <Typography variant="title">Zarejestruj się</Typography>

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
            error={form.formState.errors.username}
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
              onPress={() => {
                setError('')
                form.handleSubmit(data => mutate(data))()
              }}
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
