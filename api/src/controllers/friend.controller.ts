import { friendService, userService } from 'src/services'

import { RequestHandler } from 'express'

export const getFriendsProfiles: RequestHandler = async (req, res, next) => {
  const user = await userService.getById(req.userId)
  const friends = await friendService.getFriendsProfiles(user)

  res.status(200).json(friends)
}

export const handleRemoveFriend: RequestHandler = async (req, res, next) => {
  const { username } = req.params

  const user = await userService.getById(req.userId)

  const friends = await friendService.removeFriend(user, username)

  res.status(201).json(friends)
}
