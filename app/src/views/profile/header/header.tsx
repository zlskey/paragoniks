import Avatar from '@components/avatar'
import Flex from '@components/flex'
import { Link } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import Typography from '@components/typography'
import { colors } from 'src/app/styles'
import useUpdateAvatarImage from '@helpers/api-hooks/use-update-avatar-image'
import useUploadImage from '@helpers/hooks/use-upload-image'
import { useUserContext } from '@helpers/contexts/user.context'

function Header() {
  const { user } = useUserContext()
  const { handleUpload } = useUploadImage()
  const { mutate } = useUpdateAvatarImage()

  function handleUploadProfilePicture() {
    handleUpload(mutate)
  }

  return (
    <Flex justifyContent='space-between'>
      <Flex direction='column'>
        <Typography variant='title'>{user.username}</Typography>

        <Link href='/profile/change-username'>
          <Typography styles={{ color: colors.primary }}>
            @{user.username}
          </Typography>
        </Link>
      </Flex>

      <TouchableOpacity onPress={handleUploadProfilePicture}>
        <Avatar profile={user} size='lg' />
      </TouchableOpacity>
    </Flex>
  )
}

export default Header
