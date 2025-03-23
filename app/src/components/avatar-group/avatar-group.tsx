import Avatar from '@components/avatar'
import Flex from '@components/flex'
import { Profile } from 'src/app/generic.types'

interface AvatarGroupProps {
  profiles: Profile[]
}

function AvatarGroup({ profiles }: AvatarGroupProps) {
  return (
    <Flex spacing={-0.2}>
      {profiles.map(profile => (
        <Avatar key={profile._id} profile={profile} size='xs' />
      ))}
    </Flex>
  )
}

export default AvatarGroup
