import type { Profile } from '@paragoniks/shared'
import Avatar from '@components/avatar'
import Flex from '@components/flex'

interface AvatarGroupProps {
  profiles: Profile[]
}

function AvatarGroup({ profiles }: AvatarGroupProps) {
  return (
    <Flex spacing={-0.2}>
      {profiles.map(profile => (
        <Avatar key={profile._id} profile={profile} size="xs" />
      ))}
    </Flex>
  )
}

export default AvatarGroup
