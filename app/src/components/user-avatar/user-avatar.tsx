import { Profile, User } from 'src/types/generic.types'
import { useEffect, useState } from 'react'

import { Avatar } from '@mui/material'
import { UserAvatarProps } from './user-avatar.types'
import { selectSingleProfile } from 'src/helpers/reducers/profiles/profiles.reducer'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useAppSelector } from 'src/redux-hooks'

const UserAvatar = ({ size = 'md', userId }: UserAvatarProps) => {
  const user = useAppSelector(selectUser)

  const profileData = useAppSelector(selectSingleProfile(userId))

  if (!user) return null

  const [profile, setProfile] = useState<Profile | User>(user)

  useEffect(() => {
    if (profileData) {
      setProfile(profileData)
    }
  }, [profileData])

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
