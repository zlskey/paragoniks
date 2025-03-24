import type { Profile } from '@app/generic.types'
import type { SectionListProps } from 'react-native'
import { colors, getPx } from '@app/styles'

import Typography from '@components/typography'
import { getProfilesAlphabetically } from '@helpers/utils/get-profiles-alphabetically'
import getSectionListItemWrapper from '@helpers/utils/get-section-list-item-wrapper'
import { useMemo } from 'react'
import { SectionList, View } from 'react-native'

interface SectionHeaderProps {
  title: string
}

function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        paddingBottom: getPx(1),
      }}
    >
      <Typography>{title}</Typography>
    </View>
  )
}

interface ProfilesAlphabeticallListProps
  extends Omit<SectionListProps<Profile>, 'sections'> {
  profiles: Profile[]
  ProfileItem: React.ComponentType<{ profile: Profile }>
}

function ProfilesAlphabeticallList({
  profiles,
  ProfileItem,
  ...props
}: ProfilesAlphabeticallListProps) {
  const sections = useMemo(
    () => getProfilesAlphabetically(profiles),
    [profiles],
  )
  return (
    <SectionList
      sections={sections}
      keyExtractor={profile => profile._id}
      ListEmptyComponent={<Typography>Brak wyników</Typography>}
      stickySectionHeadersEnabled
      renderItem={data =>
        getSectionListItemWrapper(
          data.index,
          data.section.data.length,
          <ProfileItem profile={data.item} />,
        )}
      renderSectionHeader={({ section: { title } }) => (
        <SectionHeader title={title} />
      )}
      {...props}
    />
  )
}

export default ProfilesAlphabeticallList
