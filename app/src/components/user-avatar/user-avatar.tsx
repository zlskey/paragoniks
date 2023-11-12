import { Avatar } from '@mui/material'
import { AvatarColor } from 'src/types/generic.types'
import { UserAvatarProps } from './user-avatar.types'
import { selectSingleFriend } from 'src/helpers/reducers/friends/friends.reducer'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useAppSelector } from 'src/redux-hooks'

const defaultAvatarData = {
  username: '',
  avatarImage: '',
  avatarColor: AvatarColor.Default,
}

const UserAvatar = ({ size = 'md', userId }: UserAvatarProps) => {
  const user = useAppSelector(selectUser)

  const profile = useAppSelector(selectSingleFriend(userId))

  if (!user) return null

  const { username, avatarImage, avatarColor } = profile
    ? profile
    : user
    ? user
    : defaultAvatarData

  const firstUpper = username.charAt(0).toUpperCase()

  return (
    <Avatar
      alt={firstUpper}
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
