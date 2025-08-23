import type { ValueOf } from 'react-native-gesture-handler/lib/typescript/typeUtils'
import { createAnonim } from '@api/endpoints/anonim/anonim.api'
import Avatar from '@components/avatar'
import Button from '@components/button'
import Flex from '@components/flex'
import Typography from '@components/typography'
import UsernameTextField from '@components/username-text-field'
import Wrapper from '@components/wrapper'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { AvatarColor } from '@paragoniks/shared'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { FormProvider, useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const colors = Object.values(AvatarColor) as ValueOf<typeof AvatarColor>[]

const defaultValues = {
  username: '',
  avatarColor: AvatarColor.Default,
}

function CreateAnonim() {
  const addNotification = useNotificationContext()

  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: ['anonim', 'create'],
    mutationFn: createAnonim,
    onSuccess: async (_, { username }) => {
      addNotification(`Anonim ${username} dodany!`, 'success')
      await queryClient.invalidateQueries({ queryKey: ['anonims', 'all'] })
      router.back()
    },
    onError: () => {
      addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error')
    },
  })
  const form = useForm({ defaultValues })

  const { username, avatarColor } = form.watch()

  const buttonDisabled = isPending || !!form.formState.errors.username

  return (
    <Wrapper>
      <Flex
        nativeFlex
        direction="column"
        alignContent="stretch"
        justifyContent="space-between"
      >
        <FormProvider {...form}>
          <Flex direction="column" alignContent="stretch" spacing={1}>
            <UsernameTextField
              autoFocus
              error={form.formState.errors.username}
            />

            <Flex direction="column" alignContent="stretch">
              <Typography styles={styles.label}>Kolor avatara</Typography>

              <Flex alignContent="center" justifyContent="space-evenly">
                {colors.map(color => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => {
                      form.setValue('avatarColor', color)
                    }}
                  >
                    <Avatar
                      size={avatarColor === color ? 'md' : 'sm'}
                      profile={{
                        username: username || 'Anonim',
                        avatarColor: color,
                        avatarImage: '',
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </FormProvider>

        <Button
          onPress={form.handleSubmit(data => mutate(data))}
          isDisabled={buttonDisabled}
        >
          Stwórz
        </Button>
      </Flex>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  label: {},
})

export default CreateAnonim
