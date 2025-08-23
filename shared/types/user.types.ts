export interface UserMeta {
  media_quality_warning_accepted?: boolean
  noOfScans?: number
  noOfReceipts?: number
}

export interface User {
  _id: string
  username: string
  avatarColor: string
  avatarImage: string
  meta?: UserMeta
}

export interface Anonim extends User {
  ownerId: string
}

export interface Profile extends User {
  ownerId?: string
}

export interface Friendship {
  _id: string
  friendId: string
  status: 'accepted' | 'pending'
}

export type UserId = string
export type FriendId = string
export type FriendshipId = string
