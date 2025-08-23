import type { UserId } from '@types'

export interface GetAllFriendshipsBody {}

export interface SendFriendRequestBody {
  username: string
}

export interface RespondToFriendRequestBody {
  friendId: UserId
  accept: boolean
}

export interface RemoveFriendBody {
  friendId: UserId
}
