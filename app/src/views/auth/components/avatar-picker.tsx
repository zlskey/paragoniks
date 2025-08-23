import type { HandleUploadPayload } from '@helpers/hooks/use-upload-image'
import Avatar from '@components/avatar'
import Flex from '@components/flex'
import useUploadImage from '@helpers/hooks/use-upload-image'
import { AvatarColor } from '@paragoniks/shared'
import { useState } from 'react'
import { Button } from 'react-native-paper'

interface AvatarPickerProps {
  username?: string
  onAvatarChange?: (avatar: HandleUploadPayload | null) => void
}

function AvatarPicker({ username, onAvatarChange }: AvatarPickerProps) {
  const { handleUpload } = useUploadImage()
  const [avatar, setAvatar] = useState<HandleUploadPayload | null>(null)

  function handleAvatarPress() {
    const newAvatar = avatar ? null : undefined
    if (newAvatar === null) {
      setAvatar(null)
      onAvatarChange?.(null)
    }
    else {
      handleUpload((uploadedAvatar) => {
        setAvatar(uploadedAvatar)
        onAvatarChange?.(uploadedAvatar)
      })
    }
  }

  return (
    <Flex justifyContent="center">
      <Button compact onPress={handleAvatarPress}>
        <Avatar
          size="lg"
          profile={{
            username: username || '',
            avatarColor: AvatarColor.Default,
            avatarImage: avatar?.image ? `data:image/jpeg;base64,${avatar.image}` : '',
          }}
        />
      </Button>
    </Flex>
  )
}

export default AvatarPicker
export type { HandleUploadPayload }
