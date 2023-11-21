import { UserId } from 'src/types/generic.types'

export interface GetProfileBody {
  userId: UserId
}

export interface GetProfilesBody {
  userIds: UserId[]
}
