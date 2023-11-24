import { GetProfileBody, GetProfilesBody } from './profiles.api.types'

import { Profile } from 'src/types/generic.types'
import { rsApi } from '../..'

export const getProfiles = async (body: GetProfilesBody) => {
  const paramUserIds = body.userIds.join(',')

  const response = await rsApi.get<Profile[]>(
    `/user/profile?userIds=${paramUserIds}`
  )

  return response.data
}

export const getProfile = async (body: GetProfileBody) => {
  const response = await rsApi.get<Profile>(`/user/profile/${body.userId}`)

  return response.data
}
