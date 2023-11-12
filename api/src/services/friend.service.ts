import { FriendId, UserId } from 'src/types/generic.types'

import { ErrorObject } from 'src/middlewares/error.middleware'
import Friendship from 'src/models/friend.model'
import _ from 'lodash'
import { compareIds } from 'src/utils/ids-util'
import { userService } from '.'

export const findFriendship = async (firstId: FriendId, secondId: FriendId) => {
  const friendship = await Friendship.findOne({
    $or: [
      { friendId: firstId, secondFriendId: secondId },
      { friendId: secondId, secondFriendId: firstId },
    ],
  })

  if (!friendship) {
    throw new ErrorObject('Friend not found')
  }

  return friendship
}

export const findUserFriendships = async (userId: UserId) => {
  const friendships = await Friendship.find({
    $or: [{ friendId: userId, status: 'accepted' }, { secondFriendId: userId }],
  })

  const simplifiedFriendships = friendships.map(friendship => {
    const stringFriendId = friendship.friendId.toString()
    const stringSecondFriendId = friendship.secondFriendId.toString()

    const friendId =
      stringFriendId === userId.toString()
        ? stringSecondFriendId
        : stringFriendId

    return {
      ..._.pick(friendship, ['_id', 'status']),
      friendId,
    }
  })

  return simplifiedFriendships
}

export const sendFriendshipRequest = async (
  friendId: FriendId,
  friendUsername: string
) => {
  const user = await userService.getByUsername(friendUsername)

  const secondFriendId = user._id

  if (compareIds(friendId, secondFriendId)) {
    throw new ErrorObject("You can't send request to yourself")
  }

  const alreadyExistingFriendship = await Friendship.findOne({
    $or: [
      { friendId: friendId, secondFriendId: secondFriendId },
      { friendId: secondFriendId, secondFriendId: friendId },
    ],
  })

  if (!alreadyExistingFriendship) {
    await Friendship.create({
      friendId,
      secondFriendId,
    })

    return
  }

  // Friendship request already accepted
  if (alreadyExistingFriendship.status === 'accepted') {
    throw new ErrorObject("You're already friends")
  }

  // Friendship request already sent from current user
  if (alreadyExistingFriendship.secondFriendId.equals(secondFriendId)) {
    throw new ErrorObject("You've already sent a request")
  }

  // Friendship request already sent from other user, accept it
  await acceptFriendship(friendId, secondFriendId)
}

export const removeFriendship = async (firstId: UserId, secondId: UserId) => {
  const friend = await findFriendship(firstId, secondId)

  await friend.remove()
}

export const acceptFriendship = async (firstId: UserId, secondId: UserId) => {
  const friendship = await findFriendship(firstId, secondId)

  console.log(friendship)

  await Friendship.findByIdAndUpdate(friendship._id, {
    status: 'accepted',
  })
}
