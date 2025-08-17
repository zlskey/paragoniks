import type { Profile } from '@app/generic.types'
import type { UseDrawerFunctionsRef } from '@components/drawer'
import type { CreateReceiptFormState } from '../create-receipt-form'
import { getPx } from '@app/styles'
import Avatar from '@components/avatar'
import { useDrawerFunctions } from '@components/drawer'
import FriendsOrAnonimsDrawer from '@components/drawers/friends-or-anonims'
import Flex from '@components/flex'
import Paper from '@components/paper'
import ProfileList from '@components/profile-list'
import SwipeableAction from '@components/swipeable-action'
import Typography from '@components/typography'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import useProfiles from '@helpers/hooks/use-profiles'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import { useTheme } from 'react-native-paper'

interface ProfileItemProps {
  profile: Profile
}

function ProfileItem({ profile }: ProfileItemProps) {
  const { colors } = useTheme()
  const createReceiptForm = useFormContext<CreateReceiptFormState>()

  function onSwipeableOpen(direction: 'left' | 'right') {
    if (direction === 'right') {
      const contributors = createReceiptForm.getValues('contributors')
      const updatedContributors = Object.fromEntries(
        Object.entries(contributors).filter(([profileId]: [string, any]) => profile._id !== profileId),
      )
      createReceiptForm.setValue('contributors', updatedContributors)
    }
  }

  return (
    <Swipeable
      friction={1}
      onSwipeableOpen={onSwipeableOpen}
      renderRightActions={() => (
        <SwipeableAction
          color="red"
          label="Usuń"
          endIcon={<AntDesign name="edit" size={getPx(2)} color="white" />}
        />
      )}
    >
      <Flex
        styles={{ backgroundColor: colors.surface }}
        justifyContent="space-between"
        alignContent="center"
        p={1.25}
      >
        <Flex alignContent="center" spacing={1}>
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
      </Flex>
    </Swipeable>
  )
}

function ContributorsSection() {
  const { colors } = useTheme()
  const createReceiptForm = useFormContext<CreateReceiptFormState>()
  const contributors = createReceiptForm.watch('contributors')
  const profilesIds = useMemo(() => Object.keys(contributors), [contributors])

  const friendsOrAnonimsDrawerRef = useDrawerFunctions()

  const profilesData = useProfiles(profilesIds)

  function handleAddProfile(profile: Profile) {
    createReceiptForm.setValue('contributors', {
      ...contributors,
      [profile._id]: 1,
    })
  }

  return (
    <Flex direction="column" alignContent="stretch">
      <Typography>Znajomi do podziału</Typography>

      <Paper styles={{ backgroundColor: colors.surface, maxHeight: 300 }}>
        <TouchableOpacity onPress={() => friendsOrAnonimsDrawerRef.current?.present()}>
          <Flex p={0.5} flexGrow>
            <Paper styles={{ flexGrow: 1 }}>
              <Flex
                styles={{ backgroundColor: colors.surfaceVariant }}
                justifyContent="space-between"
                alignContent="center"
                p={0.75}
              >
                <Flex alignContent="center" spacing={1}>
                  <AntDesign name="adduser" size={getPx(3)} color={colors.onBackground} />
                  <Typography>Dodaj znajomego</Typography>
                </Flex>
              </Flex>
            </Paper>
          </Flex>
        </TouchableOpacity>

        <ProfileList
          refreshing={profilesData.isLoading}
          profiles={profilesData.profiles}
          ListEmptyComponent={<></>}
          ProfileItem={ProfileItem}
          scrollEnabled={false}
        />
      </Paper>

      <FriendsOrAnonimsDrawer
        filterBy={profile => profilesIds.includes(profile._id)}
        onProfilePress={handleAddProfile}
        drawerRef={friendsOrAnonimsDrawerRef as UseDrawerFunctionsRef}
      />
    </Flex>
  )
}

export default ContributorsSection
