import type { User } from 'src/app/generic.types'
import { AvatarColor } from 'src/app/generic.types'

export const userMockup: User = {
  _id: 'some_id',
  username: 'some_username',
  avatarColor: AvatarColor.Default,
  avatarImage: '',
}
