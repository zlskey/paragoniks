import type { User } from '@app/generic.types'
import type { SectionListProps } from 'react-native'
import { getPx } from '@app/styles'
import Typography from '@components/typography'
import { getProfilesAlphabetically } from '@helpers/utils/get-profiles-alphabetically'
import getSectionListItemWrapper from '@helpers/utils/get-section-list-item-wrapper'
import { useMemo } from 'react'
import { SectionList, View } from 'react-native'

interface SectionHeaderProps {
  title: string
  backgroundColor?: string
}

export function SectionHeader({ title, backgroundColor }: SectionHeaderProps) {
  return (
    <View
      style={{
        backgroundColor,
        paddingBottom: getPx(1),
      }}
    >
      <Typography>{title}</Typography>
    </View>
  )
}

interface ProfilesAlphabeticallListProps<T extends User>
  extends Omit<SectionListProps<T>, 'sections'> {
  profiles: T[]
  ProfileItem: React.ComponentType<{ profile: T }>
  sectionHeaderBackgroundColor?: string
}

function ProfilesAlphabeticallList<T extends User>({
  profiles,
  ProfileItem,
  sectionHeaderBackgroundColor,
  ...props
}: ProfilesAlphabeticallListProps<T>) {
  const sections = useMemo(
    () => getProfilesAlphabetically(profiles),
    [profiles],
  )

  return (
    <SectionList
      style={{ flex: 1 }}
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
        <SectionHeader title={title} backgroundColor={sectionHeaderBackgroundColor} />
      )}
      {...props}
    />
  )
}

export default ProfilesAlphabeticallList
