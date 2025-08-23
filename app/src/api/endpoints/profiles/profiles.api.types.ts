import type { UserId } from '@paragoniks/shared'

export interface GetProfileBody {
  userId: UserId
}

export interface GetProfilesBody {
  userIds: UserId[]
}
