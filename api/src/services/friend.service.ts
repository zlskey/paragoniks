import User, { IUser } from 'src/models/User.model'

import { ErrorObject } from 'src/middlewares/error.middleware'
import _ from 'lodash'

export const createFriendRequest = async (
  recipient: IUser,
  username: string
) => {
  if (recipient.username === username) {
    throw new ErrorObject("You can't send request to yourself")
  }

  const obj = {
    username,
    status: 'pending',
    image: undefined, // @todo
  }

  const isAlreadyOnList = recipient.friends.find(el => el.username === username)

  if (isAlreadyOnList) {
    throw new ErrorObject(
      isAlreadyOnList.status === 'accepted'
        ? "You're already friends"
        : "You've already sent a request"
    )
  }

  const updatedUser = await User.findByIdAndUpdate(
    recipient._id,
    { friends: [...recipient.friends, obj] },
    { new: true }
  )

  return updatedUser
}

export const removeFriend = async (user: IUser, username: string) => {
  const updatedFriends = user.friends.filter(
    friend => friend.username !== username
  )

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { friends: updatedFriends },
    { new: true }
  )

  return updatedUser
}

export const insertAcceptedFriend = async (user: IUser, friend: IUser) => {
  const friendObj = {
    username: friend.username,
    status: 'accepted',
    image: undefined, // @todo
  }

  const updatedFriends = isFriendAlreadyInvited(user, friend.username)
    ? user.friends.map(el => (el.username !== friend.username ? el : friendObj))
    : [...user.friends, friendObj]

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { friends: updatedFriends },
    { new: true }
  )

  return updatedUser
}

const isFriendAlreadyInvited = (user: IUser, friendUsername: string) => {
  return Boolean(
    user.friends.find(friend => friend.username === friendUsername)
  )
}
