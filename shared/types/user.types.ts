
export interface UserMeta {
  media_quality_warning_accepted?: boolean
  noOfScans?: number
  noOfReceipts?: number
}

export type Theme = 'light' | 'dark'

export type AvatarColor =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'pink'
  | 'purple'
  | 'orange'
  | 'default'

export enum AvatarColorEnum {
  Red = 'red',
  Blue = 'blue',
  Green = 'green',
  Yellow = 'yellow',
  Pink = 'pink',
  Purple = 'purple',
  Orange = 'orange',
  Default = 'default',
}

export enum Lang {
  EN = 'en',
  PL = 'pl',
  AUTO = 'auto',
}

export interface User {
  _id: unknown
  lang: Lang
  theme: Theme
  meta?: UserMeta
  avatarColor: AvatarColor
  email?: string
  username: string
  avatarImage: string
}

export interface Anonim extends Pick<User, '_id' | 'username' | 'avatarImage' | 'avatarColor'> {
  ownerId: unknown
}

export interface Profile extends Omit<Anonim, 'ownerId'> {
  ownerId?: unknown
}

export interface Friendship {
  _id: unknown
  friendId: unknown
  status: 'accepted' | 'pending'
}
