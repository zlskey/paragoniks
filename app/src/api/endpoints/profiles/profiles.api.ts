import { GetProfileBody } from './profiles.api.types'
import { Profile } from 'src/app/generic.types'
import { getRsApi } from '../../rs.api'

export const getProfile = async (body: GetProfileBody) => {
  const url = `/user/profile/${body.userId}`
  const rsApi = await getRsApi()
  const response = await rsApi.get<Profile>(url)

  return response.data
}
