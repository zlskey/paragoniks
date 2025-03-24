import type { UserId } from 'src/app/generic.types'

export interface GetProfileBody {
  userId: UserId
}

export interface GetProfilesBody {
  userIds: UserId[]
}
