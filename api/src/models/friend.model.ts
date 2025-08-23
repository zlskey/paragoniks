import type { Friendship } from 'src/types'
import mongoose from 'mongoose'

export interface IFriendshipModel extends Friendship {}

const friendshipSchema = new mongoose.Schema<IFriendshipModel>({
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
  },
})

const FriendshipModel = mongoose.model<IFriendshipModel>('Friendships', friendshipSchema)

export default FriendshipModel
