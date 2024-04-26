import { FriendId, } from 'src/types/generic.types'
import _ from 'lodash'
import mongoose from 'mongoose'

export interface IFriendship {
  friendId: FriendId
  secondFriendId: FriendId
  status: 'accepted' | 'pending'
}

const friendshipSchema = new mongoose.Schema<IFriendship>({
  friendId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  secondFriendId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  }
})

const Friendship = mongoose.model<IFriendship>('Friendships', friendshipSchema)

export default Friendship
