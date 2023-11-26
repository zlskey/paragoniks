import { StyledAvatar } from './user-avatar.styled'
import { UserAvatarProps } from './user-avatar.types'

const UserAvatar = ({ profile, ...props }: UserAvatarProps) => {
  const { username, avatarImage, avatarColor } = profile

  return (
    <StyledAvatar
      alt={username ? username.charAt(0).toUpperCase() : '?'}
      src={avatarImage || '#'}
      avatarColor={avatarColor}
      {...props}
    />
  )
}

export default UserAvatar
