import type { UserId } from '@types'

export interface GetProfileBody {
  userId: UserId
}

export interface GetProfilesBody {
  userIds: UserId[]
}
