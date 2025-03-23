import { Friendship, Profile } from 'src/app/generic.types'

import Flex from '@components/flex'
import FriendItem from './friend-item'
import ProfilesAlphabeticallList from '@components/profiles-alphabeticall-list'
import Typography from '@components/typography'

interface FriendListProps {
  status: Friendship['status']
  title: string
  items: Profile[]
}

function FriendList({ status, title, items }: FriendListProps) {
  return (
    <Flex direction='column' alignContent='stretch' spacing={1}>
      <Typography variant='subtitle'>{title}</Typography>

      <ProfilesAlphabeticallList
        profiles={items}
        ProfileItem={({ profile }) => (
          <FriendItem status={status} key={profile._id} friend={profile} />
        )}
      />
    </Flex>
  )
}

export default FriendList
