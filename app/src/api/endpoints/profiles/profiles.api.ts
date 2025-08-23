import type { Profile } from '@types'
import type { GetProfileBody } from './profiles.api.types'
import { getRsApi } from '../../rs.api'

export async function getProfile(body: GetProfileBody) {
  const url = `/user/profile/${body.userId}`
  const rsApi = await getRsApi()
  const response = await rsApi.get<Profile>(url)

  return response.data
}
