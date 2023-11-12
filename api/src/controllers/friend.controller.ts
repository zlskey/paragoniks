import { friendService, userService } from 'src/services'

import { RequestHandler } from 'express'
import { UserId } from 'src/types/generic.types'
import _ from 'lodash'

export const handleCreateFriendshipRequest: RequestHandler = async (
  req,
  res,
  next
) => {
  const { username } = req.body

  const user = req.user

  await friendService.sendFriendshipRequest(user._id, username)

  next()
}

export const handleRemoveFriend: RequestHandler = async (req, res, next) => {
  const { friendId } = req.params

  const user = req.user

  await friendService.removeFriendship(user._id, friendId as unknown as UserId)

  next()
}

export const handleRespondToFriendRequest: RequestHandler = async (
  req,
  res,
  next
) => {
  const { friendId, accept } = req.body

  const user = req.user

  if (accept) {
    await friendService.acceptFriendship(user._id, friendId)
  } else {
    await friendService.removeFriendship(user._id, friendId)
  }

  next()
}

export const defaultFriendController: RequestHandler = async (
  req,
  res,
  next
) => {
  const user = req.user

  const friendships = await friendService.findUserFriendships(user._id)

  const friends = await Promise.all(
    await friendships.map(async friendship => {
      const friend = await userService.getById(friendship.friendId)

      const { _id, username, avatarImage, avatarColor } = friend

      return {
        _id,
        username,
        avatarImage,
        avatarColor,
        status: friendship.status,
      }
    })
  )

  res.status(201).json(friends)
}
