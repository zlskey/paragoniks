import type { Friendship, Profile } from '@paragoniks/shared'
import type { UseQueryResult } from '@tanstack/react-query'

export function getSplittedAndFilteredFriendships(profiles: UseQueryResult<Profile, Error>[], friendships: Friendship[], query: string) {
  return profiles.reduce(
    (acc, { data }) => {
      if (!data) {
        return acc
      }

      const friendship = friendships.find(
        friendship => friendship.friendId === data._id,
      )

      if (!friendship) {
        return acc
      }

      if (query && !data.username.toLowerCase().includes(query.toLowerCase())) {
        return acc
      }

      friendship.status === 'accepted'
        ? acc.accepted.push(data)
        : acc.pending.push(data)

      return acc
    },
    { accepted: [] as Profile[], pending: [] as Profile[] },
  )
}
