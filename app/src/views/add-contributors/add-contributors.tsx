import { colors, getPx } from '@app/styles'
import Avatar from '@components/avatar'
import Flex from '@components/flex'
import ProfilesAlphabeticallList from '@components/profiles-alphabeticall-list'
import SearchBar from '@components/search-bar'
import Typography from '@components/typography'
import Wrapper from '@components/wrapper'
import { FontAwesome } from '@expo/vector-icons'
import useAnonims from '@helpers/hooks/use-anonims'
import useProfiles from '@helpers/hooks/use-profiles'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { useMemo, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { getAllFriendships } from 'src/api/endpoints/friends/friends.api'
import { getReceipt } from 'src/api/endpoints/receipt/receipt.api'
import useAddContributor from './use-add-contributor'

function AddContributors() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddContributor = useAddContributor({ receiptId: id as string })

  const {
    data: receipt,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['receipt', id],
    queryFn: () => getReceipt({ receiptId: id }),
    enabled: !!id,
  })
  const contributorsIds = Object.keys(receipt?.contributors || {})

  const { data: friendships } = useQuery({
    queryKey: ['friend'],
    queryFn: getAllFriendships,
    refetchInterval: 2000,
    initialData: [],
  })

  const { profiles } = useProfiles(
    friendships.flatMap(friendship =>
      friendship.status === 'accepted' ? [friendship.friendId] : [],
    ),
  )

  const { anonims } = useAnonims()

  const allProfiles = useMemo(
    () => [...profiles, ...anonims],
    [profiles, anonims],
  )

  const unaddedProfiles = useMemo(
    () => allProfiles.filter(profile => !contributorsIds.includes(profile._id)),
    [allProfiles, contributorsIds],
  )

  const filteredProfiles = useMemo(
    () =>
      unaddedProfiles.filter(profile =>
        profile.username.includes(searchQuery.toLowerCase()),
      ),
    [unaddedProfiles, searchQuery],
  )

  return (
    <Wrapper>
      <Flex direction="column" spacing={2} alignContent="stretch" nativeFlex>
        <SearchBar onSearch={setSearchQuery} query={searchQuery} />

        <ProfilesAlphabeticallList
          profiles={filteredProfiles}
          refreshing={isLoading}
          onRefresh={refetch}
          ProfileItem={({ profile }) => (
            <TouchableOpacity
              key={profile._id}
              onPress={() => handleAddContributor(profile._id)}
            >
              <Flex
                p={1}
                spacing={1}
                alignContent="center"
                styles={{ backgroundColor: colors.paper }}
              >
                <Avatar profile={profile} size="sm" />
                <Typography>{profile.username}</Typography>

                {profile.ownerId && (
                  <FontAwesome
                    name="user-secret"
                    size={getPx(2)}
                    color={colors.placeholder}
                  />
                )}
              </Flex>
            </TouchableOpacity>
          )}
        />
      </Flex>
    </Wrapper>
  )
}

export default AddContributors
