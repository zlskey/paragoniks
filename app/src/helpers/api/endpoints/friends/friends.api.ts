import {
  GetAllFriendshipsBody,
  RemoveFriendBody,
  RespondToFriendRequestBody,
  SendFriendRequestBody,
} from './friends.api.types'

import { Friendship } from 'src/types/generic.types'
import { rsApi } from '../..'

export const getAllFriendships = async (body: GetAllFriendshipsBody) => {
  const url = 'friend'
  const response = await rsApi.get<Friendship[]>(url, body)

  return response.data
}

export const sendFriendRequest = async (body: SendFriendRequestBody) => {
  const url = 'friend'
  const response = await rsApi.post<Friendship>(url, body)

  return response.data
}

export const respondToFriendRequest = async (
  body: RespondToFriendRequestBody
) => {
  const url = 'friend/respond'
  const response = await rsApi.patch<Friendship>(url, body)

  return response.data
}

export const removeFriend = async (body: RemoveFriendBody) => {
  const url = `friend/${body.friendId}`
  const response = await rsApi.delete<Friendship>(url)

  return response.data
}
