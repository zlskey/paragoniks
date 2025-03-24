import type { Division, DivisionType, Profile } from 'src/app/generic.types'
import Avatar from '@components/avatar'

import Flex from '@components/flex'
import Typography from '@components/typography'
import { FontAwesome } from '@expo/vector-icons'
import { Checkbox } from 'react-native-paper'
import { colors, getPx } from 'src/app/styles'
import DivisionInput from './division-input'

interface UserItemProps {
  division: Division
  contributor: Profile
  divisionType: DivisionType
  onDivisionValueChange: (profileId: string, value: string) => void
  onDivisionCheckboxChange: (profileId: string) => void
}

function UserItem({
  division,
  contributor,
  onDivisionCheckboxChange,
  ...props
}: UserItemProps) {
  function onCheckboxChange() {
    onDivisionCheckboxChange(contributor._id)
  }

  return (
    <Flex
      p={1}
      spacing={1}
      alignContent="center"
      key={contributor._id}
      justifyContent="space-between"
    >
      <Checkbox
        color={colors.primary}
        onPress={onCheckboxChange}
        status={
          division[contributor._id] !== null ? 'checked' : 'indeterminate'
        }
      />

      <Flex alignContent="center" spacing={1} nativeFlex>
        <Avatar profile={contributor} size="sm" />
        <Typography>{contributor.username}</Typography>
        {contributor.ownerId && (
          <FontAwesome
            name="user-secret"
            size={getPx(2)}
            color={colors.placeholder}
          />
        )}
      </Flex>

      <DivisionInput
        division={division}
        profileId={contributor._id}
        {...props}
      />
    </Flex>
  )
}

export default UserItem
