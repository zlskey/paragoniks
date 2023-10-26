import User, { IUser } from 'src/models/User.model'

import _ from 'lodash'
import { userService } from 'src/services'

export const getFriendsProfiles = async (user: IUser) => {
  const usernames = user.friends

  const friends = await Promise.all(
    usernames.map(async username => {
      const profile = await userService.getByUsername(username)

      // add images
      return { username: profile.username }
    })
  )

  return friends
}

export const removeFriend = async (
  user: IUser,
  friendUsername: IUser['username']
) => {
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      friends: user.friends.filter(username => username !== friendUsername),
    },
    { new: true }
  )

  return updatedUser.friends
}
