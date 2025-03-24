import type { WhoamiUserResponse } from 'src/api/endpoints/user/user.api.types'
import Button from '@components/button'

import Flex from '@components/flex'
import TextField from '@components/text-field'
import Typography from '@components/typography'
import Wrapper from '@components/wrapper'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { changeUsername } from 'src/api/endpoints/user/user.api'

const defaultValues = {
  username: '',
}

function ChangeUsername() {
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
    },
    onError: (err: any) => {
      if (err.response.data.error.message) {
        formState.setError('username', {
          type: 'manual',
          message: err.response.data.error.message,
        })
      }
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

          <TextField
            error={formState.formState.errors.username}
            name="username"
            label="Nazwa"
            fullWidth
            autoFocus
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
