import { Avatar } from '@mui/material'
import { UserAvatarProps } from './user-avatar.types'

const UserAvatar = ({ size = 'md', profile }: UserAvatarProps) => {
  const { username, avatarImage, avatarColor } = profile

  return (
    <Avatar
      alt={username ? username.charAt(0).toUpperCase() : '?'}
      src={avatarImage || '#'}
      sx={{
        bgcolor: avatarColor,
        width: size === 'md' ? 40 : 50,
        height: size === 'md' ? 40 : 50,
      }}
    />
  )
}

export default UserAvatar
