import { FriendId } from 'src/types/generic.types'

export interface GetAllFriendshipsBody {}

export interface SendFriendRequestBody {
  username: string
}

export interface RespondToFriendRequestBody {
  friendId: FriendId
  accept: boolean
}

export interface RemoveFriendBody {
  friendId: FriendId
}
