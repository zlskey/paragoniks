import type { Friendship } from 'src/app/generic.types'

import type {
  GetAllFriendshipsBody,
  RemoveFriendBody,
  RespondToFriendRequestBody,
  SendFriendRequestBody,
} from './friends.api.types'
import { getRsApi } from 'src/api/rs.api'

export async function getAllFriendships(body: GetAllFriendshipsBody) {
  const url = 'friend'
  const rsApi = await getRsApi()
  const response = await rsApi.get<Friendship[]>(url, body)

  return response.data
}

export async function sendFriendRequest(body: SendFriendRequestBody) {
  const url = 'friend'
  const rsApi = await getRsApi()
  const response = await rsApi.post<Friendship>(url, body)

  return response.data
}

export async function respondToFriendRequest(body: RespondToFriendRequestBody) {
  const url = 'friend/respond'
  const rsApi = await getRsApi()
  const response = await rsApi.patch<Friendship>(url, body)

  return response.data
}

export async function removeFriend(body: RemoveFriendBody) {
  const url = `friend/${body.friendId}`
  const rsApi = await getRsApi()
  const response = await rsApi.delete<Friendship>(url)

  return response.data
}
