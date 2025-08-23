import type { Profile } from '@types'
import { AvatarColorEnum } from '@types'

export const profilesMockup: Profile[] = [
  {
    _id: '1',
    username: 'Test User',
    avatarColor: AvatarColorEnum.Default,
    avatarImage: '',
  },
  {
    _id: '2',
    username: 'Test User 2',
    avatarColor: AvatarColorEnum.Default,
    avatarImage: '',
  },
]
