import { Avatar, useTheme } from '@mui/material'

import { UserAvatarProps } from './user-avatar.types'

const UserAvatar = ({
  size = 'md',
  profile,
  selected,
  onClick,
}: UserAvatarProps) => {
  const { username, avatarImage, avatarColor } = profile

  const theme = useTheme()

  return (
    <Avatar
      onClick={onClick}
      alt={username ? username.charAt(0).toUpperCase() : '?'}
      src={avatarImage || '#'}
      sx={{
        bgcolor: avatarColor,
        width: size === 'md' ? 40 : 50,
        height: size === 'md' ? 40 : 50,
        boxShadow: selected ? theme.shadows[15] : '',
        transform: selected ? 'scale(1.15)' : '',
        cursor: !!onClick ? 'pointer' : 'default',
      }}
    />
  )
}

export default UserAvatar
