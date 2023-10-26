import { friendService, userService } from 'src/services'

import { RequestHandler } from 'express'

export const handleRemoveFriend: RequestHandler = async (req, res, next) => {
  const { username } = req.params

  const user = await userService.getById(req.userId)

  const updatedUser = await friendService.removeFriend(user, username)

  const removedFriend = await userService.getByUsername(username)

  await friendService.removeFriend(removedFriend, user.username)

  res.status(201).json(updatedUser)
}

export const handleCreateFriendRequest: RequestHandler = async (
  req,
  res,
  next
) => {
  const { username } = req.body

  const user = await userService.getById(req.userId)

  const recipient = await userService.getByUsername(username)

  await friendService.createFriendRequest(recipient, user.username)

  res.status(201).json(user)
}

export const handleRespondToFriendRequest: RequestHandler = async (
  req,
  res,
  next
) => {
  const { username, accept } = req.body

  const user = await userService.getById(req.userId)

  const friend = await userService.getByUsername(username)

  const updatedUser = accept
    ? await friendService.insertAcceptedFriend(user, friend)
    : await friendService.removeFriend(user, friend.username)

  if (accept) {
    await friendService.insertAcceptedFriend(friend, user)
  }

  res.status(201).json(updatedUser)
}
