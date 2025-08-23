import type { UseDrawerFunctionsRef } from '@components/drawer/drawer'
import type { Profile } from '@types'
import { getPx } from '@app/styles'
import Avatar from '@components/avatar'
import Drawer from '@components/drawer/drawer'
import Flex from '@components/flex'
import ProfilesAlphabeticallList from '@components/profiles-alphabeticall-list'
import SearchBar from '@components/search-bar'
import Typography from '@components/typography'
import { FontAwesome } from '@expo/vector-icons'
import useUserFriendsAndAnonims from '@helpers/api-hooks/use-user-friends-and-anonims'
import { useMemo, useState } from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-paper'

interface FriendsOrAnonimsProps {
  title?: string
  drawerRef: UseDrawerFunctionsRef
  filterBy?: (profile: Profile) => boolean
  onProfilePress?: (profile: Profile) => void
}

function FriendsOrAnonims({ drawerRef, onProfilePress, filterBy, title = 'Znajomi' }: FriendsOrAnonimsProps) {
  const { colors } = useTheme()
  const { height } = Dimensions.get('window')
  const { data: profiles } = useUserFriendsAndAnonims()

  const [currentSnapPoint, setCurrentSnapPoint] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile =>
      profile.username.includes(searchQuery) && (!filterBy || !filterBy(profile)))
  }, [searchQuery, filterBy, profiles])

  const snapPoints = useMemo(() => ['50%', '90%'], [height])
  const listHeights = useMemo(() => snapPoints.map(val => height * Number.parseInt(val) / 100 - 100), [snapPoints])

  return (
    <Drawer
      enableContentPanningGesture={false}
      enableDynamicSizing={false}
      enableOverDrag={false}
      onSnapPointChange={setCurrentSnapPoint}
      snapPoints={snapPoints}
      ref={drawerRef}
      title={title}
    >
      <Flex
        pr={1}
        pl={1}
        spacing={2}
        direction="column"
        alignContent="stretch"
      >
        <SearchBar
          query={searchQuery}
          onSearch={setSearchQuery}
          background="backdrop"
        />

        <ProfilesAlphabeticallList
          sectionHeaderBackgroundColor={colors.surface}
          style={{
            maxHeight: listHeights[currentSnapPoint],
          }}
          profiles={filteredProfiles}
          ProfileItem={({ profile }) => (
            <TouchableOpacity
              key={profile._id}
              disabled={!onProfilePress}
              onPress={() => onProfilePress?.(profile)}
            >
              <Flex
                p={1}
                spacing={1}
                alignContent="center"
                styles={{ backgroundColor: colors.surfaceVariant }}
              >
                <Avatar profile={profile} size="sm" />
                <Typography>{profile.username}</Typography>

                {profile.ownerId && (
                  <FontAwesome
                    name="user-secret"
                    size={getPx(2)}
                    color={colors.onSurfaceVariant}
                  />
                )}
              </Flex>
            </TouchableOpacity>
          )}
        />
      </Flex>
    </Drawer>
  )
}

export default FriendsOrAnonims
