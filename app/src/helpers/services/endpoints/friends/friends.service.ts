import {
  GetAllFriendshipsBody,
  RemoveFriendBody,
  RespondToFriendRequestBody,
  SendFriendRequestBody,
} from './friends.service.types'

import { Friend } from 'src/types/generic.types'
import { rsApi } from '../..'

export const getAllFriendships = async (body: GetAllFriendshipsBody) => {
  const response = await rsApi.get<Friend[]>('friend', body)

  return response.data
}

export const sendFriendRequest = async (body: SendFriendRequestBody) => {
  const response = await rsApi.post<Friend>('friend', body)

  return response.data
}

export const respondToFriendRequest = async (
  body: RespondToFriendRequestBody
) => {
  const response = await rsApi.patch<Friend>('friend/respond', body)

  return response.data
}

export const removeFriend = async (body: RemoveFriendBody) => {
  const { friendId } = body

  const response = await rsApi.delete<Friend>(`friend/${friendId}`)

  return response.data
}
