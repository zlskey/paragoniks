import type { FriendId, UserId } from 'src/types'
import { ErrorObject } from 'src/middlewares/error.middleware'
import Friendship from 'src/models/friend.model'
import { compareIds } from 'src/utils/ids-util'
import { receiptService, userService } from '.'

export async function findFriendship(firstId: FriendId, secondId: FriendId) {
  const friendship = await Friendship.findOne({
    $or: [
      { friendId: firstId, secondFriendId: secondId },
      { friendId: secondId, secondFriendId: firstId },
    ],
  })

  if (!friendship) {
    throw new ErrorObject('Przyjaciel nie istnieje')
  }

  return friendship
}

export async function findUserFriendships(userId: UserId) {
  const friendships = await Friendship.find({
    $or: [{ friendId: userId, status: 'accepted' }, { secondFriendId: userId }],
  })

  const simplifiedFriendships = friendships.map((friendship) => {
    const stringFriendId = friendship.friendId.toString()
    const stringSecondFriendId = friendship.secondFriendId.toString()

    const friendId = stringFriendId === userId.toString()
      ? stringSecondFriendId
      : stringFriendId

    const { _id, status } = friendship

    return {
      _id,
      status,
      friendId,
    }
  })

  return simplifiedFriendships
}

export async function findAllUserAcceptedFriendsIds(userId: UserId) {
  const friendships = await Friendship.find({
    $or: [{ friendId: userId, status: 'accepted' }, { secondFriendId: userId, status: 'accepted' }],
  })

  const userAccepterFriendsIds: FriendId[] = friendships.map((friendship) => {
    return friendship.friendId.toString() === userId.toString()
      ? friendship.secondFriendId
      : friendship.friendId
  })

  return userAccepterFriendsIds
}

export async function sendFriendshipRequest(friendId: FriendId, friendUsername: string) {
  const user = await userService.getByUsername(friendUsername)

  const secondFriendId = user._id

  if (compareIds(friendId, secondFriendId)) {
    throw new ErrorObject('Nie możesz wysłać zaproszenia do siebie')
  }

  const alreadyExistingFriendship = await Friendship.findOne({
    $or: [
      { friendId, secondFriendId },
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
    throw new ErrorObject('Jesteście już znajomymi')
  }

  // Friendship request already sent from current user
  if (alreadyExistingFriendship.secondFriendId.equals(secondFriendId)) {
    throw new ErrorObject('Znajomy dostał już zaproszenie')
  }

  // Friendship request already sent from other user, accept it
  await acceptFriendship(friendId, secondFriendId)
}

export async function removeFriendship(firstId: UserId, secondId: UserId) {
  const friend = await findFriendship(firstId, secondId)
  await receiptService.removeUserFromAllReceipts(secondId, firstId)
  await friend.remove()
}

export async function acceptFriendship(firstId: UserId, secondId: UserId) {
  const friendship = await findFriendship(firstId, secondId)

  await Friendship.findByIdAndUpdate(friendship._id, {
    status: 'accepted',
  })
}
