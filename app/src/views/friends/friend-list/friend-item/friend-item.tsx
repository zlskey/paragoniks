import { Friendship, Profile } from '@app/generic.types'

import AcceptFriendAction from './accept-friend-action/accept-friend-action'
import Avatar from '@components/avatar'
import DeclineFriendAction from './decline-friend-action'
import Flex from '@components/flex'
import RemoveFriendButton from './remove-friend-button/remove-friend-button'
import { Swipeable } from 'react-native-gesture-handler'
import Typography from '@components/typography'
import { colors } from '@app/styles'
import useAcceptFriendRequest from './accept-friend-action/use-accept-friend-request'
import useDeclineFriendRequest from './decline-friend-action/use-decline-friend-request'
import useRemoveFriend from './remove-friend-button/use-remove-friend'

interface FriendItemProps {
  friend: Profile
  status: Friendship['status']
}

function FriendItem({ friend, status }: FriendItemProps) {
  const handleRemoveFriend = useRemoveFriend()
  const acceptFriendRequest = useAcceptFriendRequest()
  const declineFriendRequest = useDeclineFriendRequest()

  const isAccepted = status === 'accepted'
  const friendId = friend._id

  function onSwipeableOpen(direction: 'left' | 'right') {
    if (isAccepted && direction === 'right') {
      handleRemoveFriend({ friendId })
      return
    }

    if (direction === 'left') {
      acceptFriendRequest({ friendId })
      return
    }

    declineFriendRequest({ friendId })
  }

  return (
    <Swipeable
      friction={1}
      onSwipeableOpen={onSwipeableOpen}
      renderLeftActions={() => !isAccepted && <AcceptFriendAction />}
      renderRightActions={() =>
        isAccepted ? <RemoveFriendButton /> : <DeclineFriendAction />
      }
    >
      <Flex
        alignContent='center'
        styles={{ backgroundColor: colors.paper }}
        spacing={1}
        p={1.25}
      >
        <Avatar profile={friend} size='sm' />
        <Typography>{friend.username}</Typography>
      </Flex>
    </Swipeable>
  )
}

export default FriendItem
