import type { User } from '@types'
import { AvatarColorEnum, Lang } from '@types'

export const userMockup: User = {
  _id: 'some_id',
  username: 'some_username',
  avatarColor: AvatarColorEnum.Default,
  avatarImage: '',
  lang: Lang.PL,
  theme: 'dark',
}
