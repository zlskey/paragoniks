import type { User } from '@paragoniks/shared'
import { AvatarColor } from '@paragoniks/shared'

export const userMockup: User = {
  _id: 'some_id',
  username: 'some_username',
  avatarColor: AvatarColor.Default,
  avatarImage: '',
}
