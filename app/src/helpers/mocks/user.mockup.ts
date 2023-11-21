import { AvatarColor, User } from 'src/types/generic.types'

import { locales } from '../i18n/i18n.data'

export const dummyUser: User = {
  _id: '',
  username: 'dummy',
  theme: 'dark',
  avatarColor: AvatarColor.Default,
  avatarImage: '',
  lang: locales[2],
}
