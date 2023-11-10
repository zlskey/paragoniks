import { Avatar } from '@mui/material'
import { AvatarColor } from 'src/types/generic.types'
import { UserAvatarProps } from './user-avatar.types'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useAppSelector } from 'src/redux-hooks'

const defaultAvatarData = {
  username: '',
  avatarImage: '',
  avatarColor: AvatarColor.Default,
}

const UserAvatar = ({ profile, size = 'md' }: UserAvatarProps) => {
  const { username, avatarImage, avatarColor } =
    profile || useAppSelector(selectUser) || defaultAvatarData

  return (
    <Avatar
      alt={username || ''}
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
