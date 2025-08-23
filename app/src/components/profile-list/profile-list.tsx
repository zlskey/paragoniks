import type { Profile } from '@paragoniks/shared'
import type { FlatListProps } from 'react-native'
import Typography from '@components/typography'
import { FlatList } from 'react-native'

interface ProfileListProps
  extends Omit<FlatListProps<Profile>, 'sections' | 'data' | 'renderItem' | 'ListEmptyComponent'> {
  profiles: Profile[]
  ProfileItem: React.ComponentType<{ profile: Profile }>
  ListEmptyComponent?: React.ReactElement
}

function ProfileList({
  profiles,
  ProfileItem,
  ListEmptyComponent = <Typography>Brak wyników</Typography>,
  ...props
}: ProfileListProps) {
  return (
    <FlatList
      data={profiles}
      keyExtractor={profile => profile._id}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={({ item }) => <ProfileItem profile={item} />}
      {...props}
    />
  )
}

export default ProfileList
