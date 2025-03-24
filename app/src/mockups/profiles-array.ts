import type { Profile } from 'src/app/generic.types'
import { AvatarColor } from 'src/app/generic.types'

export const profilesMockup: Profile[] = [
  {
    _id: '1',
    username: 'Test User',
    avatarColor: AvatarColor.Default,
    avatarImage: '',
  },
  {
    _id: '2',
    username: 'Test User 2',
    avatarColor: AvatarColor.Default,
    avatarImage: '',
  },
]
