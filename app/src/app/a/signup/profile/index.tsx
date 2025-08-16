import type { HandleUploadPayload } from '@helpers/hooks/use-upload-image'
import { AvatarColor } from '@app/generic.types'
import AuthFooter from '@components/auth-footer'
import AuthWrapper from '@components/auth-wrapper'
import Avatar from '@components/avatar'
import Flex from '@components/flex'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import useUploadImage from '@helpers/hooks/use-upload-image'
import { saveToStorage } from '@helpers/utils/storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from 'react-native-paper'
import { signupUser } from 'src/api/endpoints/user/user.api'

const defaultValues = {
  avatar: '',
}

function SignupProfile() {
  const { username, password } = useLocalSearchParams<{
    username: string
    password: string
  }>()
  const addNotification = useNotificationContext()
  const form = useForm({ defaultValues })
  const queryClient = useQueryClient()

  const { handleUpload } = useUploadImage()
  const [avatar, setAvatar] = useState<HandleUploadPayload | null>(null)

  const { mutate, isPending } = useMutation({
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

  function onSubmit(_data: typeof defaultValues) {
    if (!username || !password) {
      addNotification('Brakuje wymaganych danych', 'error')
      return
    }

    mutate({
      username,
      password,
      avatarImage: avatar?.image ? `data:image/jpeg;base64,${avatar?.image}` : '',
    })
  }

  return (
    <AuthWrapper
      title="Utwórz konto"
      subtitle="Kliknij na avatar, aby wybrać swoje zdjęcie profilowe."
    >
      <FormProvider {...form}>
        <Flex justifyContent="center">
          <Button compact onPress={() => avatar ? setAvatar(null) : handleUpload(setAvatar)}>
            <Avatar
              size="lg"
              profile={{
                username,
                avatarColor: AvatarColor.Default,
                avatarImage: avatar?.image ? `data:image/jpeg;base64,${avatar?.image}` : '',
              }}
            />
          </Button>
        </Flex>

        <AuthFooter
          rightButtonLabel="Utwórz konto"
          rightButtonProps={{ loading: isPending }}
          onRightButtonPress={form.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </AuthWrapper>
  )
}

export default SignupProfile
