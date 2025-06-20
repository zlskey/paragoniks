import type { Profile } from 'src/app/generic.types'

import Avatar from '@components/avatar'
import Flex from '@components/flex'
import Typography from '@components/typography'
import { FontAwesome } from '@expo/vector-icons'
import { useUserContext } from '@helpers/contexts/user.context'
import { getLocaleCurrency } from '@helpers/utils'
import { Swipeable } from 'react-native-gesture-handler'
import { colors, getPx } from 'src/app/styles'
import { useReceiptContext } from 'src/views/receipt/receipt.context'
import RemoveContributorIcon from './remove-contributor-action'
import useRemoveContributor from './remove-contributor-action/use-remove-contributor'

interface ContributorItemProps {
  contributor: Profile
}

function ContributorItem({ contributor }: ContributorItemProps) {
  const { user } = useUserContext()
  const { receipt } = useReceiptContext()
  const onRemoveContributor = useRemoveContributor({
    contributorId: contributor._id,
  })

  const userCut = getLocaleCurrency(receipt.contributors[contributor._id])
  const isOwner = user._id === receipt.owner
  const isContributor = contributor._id === user._id

  return (
    <Swipeable
      friction={1}
      onSwipeableOpen={direction =>
        direction === 'right' && onRemoveContributor()}
      renderRightActions={() =>
        isOwner && !isContributor && <RemoveContributorIcon />}
    >
      <Flex
        styles={{ backgroundColor: colors.paper }}
        justifyContent="space-between"
        alignContent="center"
        p={1.25}
      >
        <Flex alignContent="center" spacing={1}>
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

        <Typography>{userCut}</Typography>
      </Flex>
    </Swipeable>
  )
}

export default ContributorItem
