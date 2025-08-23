import type { RequestHandler } from 'express'
import type { UserId } from 'src/types/backend.types'
import { friendService } from 'src/services'

export const handleCreateFriendshipRequest: RequestHandler = async (
  req,
  res,
  next,
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
  next,
) => {
  const { friendId, accept } = req.body

  const user = req.user

  if (accept) {
    await friendService.acceptFriendship(user._id, friendId)
  }
  else {
    await friendService.removeFriendship(user._id, friendId)
  }

  next()
}

export const defaultFriendController: RequestHandler = async (req, res) => {
  const user = req.user

  const friendships = await friendService.findUserFriendships(user._id)

  res.status(201).json(friendships)
}
