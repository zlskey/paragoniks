import {
  GetAllFriendshipsBody,
  RemoveFriendBody,
  RespondToFriendRequestBody,
  SendFriendRequestBody,
} from './friends.api.types'

import { Friendship } from 'src/types/generic.types'
import { rsApi } from '../..'

export const getAllFriendships = async (body: GetAllFriendshipsBody) => {
  const response = await rsApi.get<Friendship[]>('friend', body)

  return response.data
}

export const sendFriendRequest = async (body: SendFriendRequestBody) => {
  const response = await rsApi.post<Friendship>('friend', body)

  return response.data
}

export const respondToFriendRequest = async (
  body: RespondToFriendRequestBody
) => {
  const response = await rsApi.patch<Friendship>('friend/respond', body)

  return response.data
}

export const removeFriend = async (body: RemoveFriendBody) => {
  const { friendId } = body

  const response = await rsApi.delete<Friendship>(`friend/${friendId}`)

  return response.data
}
