import { Profile, User } from 'src/types/generic.types'

export interface UserAvatarProps {
  size?: 'md' | 'lg'
  profile: User | Profile
  selected?: boolean
  clickable?: boolean
  onClick?: () => any
}
