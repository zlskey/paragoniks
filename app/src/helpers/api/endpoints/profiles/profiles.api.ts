import { GetProfileBody, GetProfilesBody } from './profiles.api.types'

import { Profile } from 'src/types/generic.types'
import { rsApi } from '../..'

export const getProfiles = async (body: GetProfilesBody) => {
  const url = `/user/profile?userIds=${body.userIds.join(',')}`
  const response = await rsApi.get<Profile[]>(url)

  return response.data
}

export const getProfile = async (body: GetProfileBody) => {
  const url = `/user/profile/${body.userId}`
  const response = await rsApi.get<Profile>(url)

  return response.data
}
