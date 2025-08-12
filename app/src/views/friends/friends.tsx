import Flex from '@components/flex'
import SearchBar from '@components/search-bar'
import Typography from '@components/typography'
import Wrapper from '@components/wrapper'
import { useQueries, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getAllFriendships } from 'src/api/endpoints/friends/friends.api'
import { getProfile } from 'src/api/endpoints/profiles/profiles.api'
import FriendList from './friend-list'
import { getSplittedAndFilteredFriendships } from './get-splitted-friendships'

function Friends() {
  const [searchQuery, setSearchQuery] = useState('')

  const { data: friendships } = useQuery({
    queryKey: ['friend'],
    queryFn: getAllFriendships,
    refetchInterval: 2000,
    initialData: [],
  })

  const results = useQueries({
    queries: friendships.map(friendship => ({
      queryKey: ['profile', friendship.friendId],
      queryFn: () => getProfile({ userId: friendship.friendId }),
    })),
  })

  const friendsState = getSplittedAndFilteredFriendships(
    results,
    friendships,
    searchQuery,
  )

  const noFriends
    = !friendsState.accepted.length && !friendsState.pending.length

  return (
    <Wrapper>
      <Flex direction="column" alignContent="stretch" spacing={2}>
        {!!friendships.length && <SearchBar onSearch={setSearchQuery} />}

        {noFriends && (
          <Typography variant="subtitle">
            Nie masz jeszcze żadnych znajomych 😢
          </Typography>
        )}

        {friendsState.accepted.length > 0 && (
          <FriendList
            items={friendsState.accepted}
            status="accepted"
            title="Twoi znajomi"
          />
        )}

        {friendsState.pending.length > 0 && (
          <FriendList
            items={friendsState.pending}
            status="pending"
            title="Oczekujący znajomi"
          />
        )}
      </Flex>
    </Wrapper>
  )
}

export default Friends
