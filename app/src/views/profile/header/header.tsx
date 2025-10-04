import { resendEmailConfirmation } from '@api/endpoints/user/user.api'
import Avatar from '@components/avatar'
import Flex from '@components/flex'
import Typography from '@components/typography'
import useUpdateAvatarImage from '@helpers/api-hooks/use-update-avatar-image'
import { SOMETHING_WENT_WRONG_MESSAGE } from '@helpers/constants'
import { useNotificationContext } from '@helpers/contexts/notification.context'
import { useUserContext } from '@helpers/contexts/user.context'
import useUploadImage from '@helpers/hooks/use-upload-image'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-paper'

function EmailButton() {
  const { colors } = useTheme()
  const { user } = useUserContext()
  const addNotification = useNotificationContext()
  const { mutate: handleResendEmailConfirmation } = useMutation({
    mutationFn: resendEmailConfirmation,
    onSuccess: () => {
      addNotification('Link do potwierdzenia email został wysłany', 'success')
    },
    onError: () => {
      addNotification(SOMETHING_WENT_WRONG_MESSAGE, 'error')
    },
  })

  if (user.meta?.provider) {
    return (
      <Typography styles={{ color: colors.primary }}>
        {user.email}
      </Typography>
    )
  }

  if (user.meta?.emailToConfirm) {
    return (
      <Typography variant="base2">
        Kliknij w link w emailu, aby go potwierdzić, lub
        {' '}
        <Typography
          variant="base2"
          styles={{ color: colors.primary }}
          onPress={() => handleResendEmailConfirmation()}
        >
          wyślij ponownie link
        </Typography>
        .
      </Typography>
    )
  }

  return (
    <Link href="/profile/change-email">
      <Typography styles={{ color: colors.primary }}>
        {user.email ?? 'Połącz adres email'}
      </Typography>
    </Link>
  )
}

function Header() {
  const { user } = useUserContext()
  const { colors } = useTheme()
  const { handleUpload } = useUploadImage()
  const { mutate } = useUpdateAvatarImage()

  function handleUploadProfilePicture() {
    handleUpload(mutate)
  }

  return (
    <Flex justifyContent="space-between">
      <Flex direction="column">
        <Typography variant="title">{user.username}</Typography>

        <Flex spacing={0.5} alignContent="center">
          <Link href="/profile/change-username">
            <Typography styles={{ color: colors.primary }}>
              @
              {user.username}
            </Typography>
          </Link>

          <Typography>•</Typography>

          <EmailButton />
        </Flex>
      </Flex>

      <TouchableOpacity onPress={handleUploadProfilePicture}>
        <Avatar profile={user} size="lg" />
      </TouchableOpacity>
    </Flex>
  )
}

export default Header
