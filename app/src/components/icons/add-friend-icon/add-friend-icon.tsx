import Button from '@components/button'
import Flex from '@components/flex'
import IconButton from '@components/icon-button'
import Typography from '@components/typography'
import UsernameTextField from '@components/username-text-field'
import { AntDesign } from '@expo/vector-icons'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Dialog, Portal } from 'react-native-paper'
import { sendFriendRequest } from 'src/api/endpoints/friends/friends.api'
import { colors, getPx } from 'src/app/styles'

const defaultValues = {
  friendUsername: '',
}

function AddFriendIcon() {
  const [isDialogOpened, setIsDialogOpened] = useState(false)
  const addNotification = useNotificationContext()

  const formState = useForm({
    defaultValues,
  })

  const queryClient = useQueryClient()

  const { mutate: handleAddFriend, isPending } = useMutation({
    mutationKey: ['friend'],
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend'] })
      addNotification(
        `Zaproszenie do ${formState.getValues(
          'friendUsername',
        )} zostało wysłane`,
        'success',
      )
      formState.reset()
      setIsDialogOpened(false)
    },
    onError: (err: any) => {
      const errorMessage = err?.response?.data.error.message
      addNotification(errorMessage || SOMETHING_WENT_WRONG_MESSAGE, 'error')
    },
  })

  function onSubmit(data: typeof defaultValues) {
    const { friendUsername } = data
    const lowerCaseUsername = friendUsername.toLowerCase()
    handleAddFriend({ username: lowerCaseUsername })
  }

  function handleOpenDialog() {
    setIsDialogOpened(true)
  }

  function handleCloseDialog() {
    setIsDialogOpened(false)
    formState.reset(defaultValues)
  }

  return (
    <>
      <IconButton
        icon={
          <AntDesign name="adduser" size={getPx(2.3)} color={colors.text} />
        }
        onPress={handleOpenDialog}
      />

      <Portal>
        <Dialog
          onDismiss={handleCloseDialog}
          visible={isDialogOpened}
          style={{
            backgroundColor: colors.background,
            borderRadius: 10,
          }}
        >
          <FormProvider {...formState}>
            <Flex direction="column" alignContent="stretch" spacing={2} p={2}>
              <Flex justifyContent="space-between">
                <Typography variant="subtitle">Zaproś znajomych</Typography>

                <AntDesign
                  onPress={handleCloseDialog}
                  name="close"
                  size={24}
                  color="white"
                />
              </Flex>

              <UsernameTextField
                label="Nazwa znajomego"
                name="friendUsername"
                autoFocus
              />

              <Flex spacing={1} justifyContent="flex-end">
                <Button
                  onPress={formState.handleSubmit(onSubmit)}
                  isDisabled={isPending}
                  variant="contained"
                  small
                >
                  Zaproś
                </Button>
              </Flex>
            </Flex>
          </FormProvider>
        </Dialog>
      </Portal>
    </>
  )
}

export default AddFriendIcon
