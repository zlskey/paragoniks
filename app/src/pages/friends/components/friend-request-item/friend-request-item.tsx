import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'

import AcceptFriendIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import DeclineFriendRequestIcon from '@mui/icons-material/PersonOffOutlined'
import { FriendRequestItemProps } from './friend-request-item.types'
import FriendRequestItemSkeleton from './friend-request-item.skeleton'
import { Trans } from '@lingui/macro'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { getProfile } from 'src/helpers/api/endpoints/profiles/profiles.api'
import { useQuery } from '@tanstack/react-query'
import useRespondToFriendRequest from './use-respond-to-friend-request'

const FriendRequestItem = ({ friendship }: FriendRequestItemProps) => {
  const { data: profile } = useQuery({
    queryKey: ['user', 'profile', { userId: friendship.friendId }],
    queryFn: () => getProfile({ userId: friendship.friendId }),
    initialData: null,
  })

  const handleRespondToFriendshipRequest = useRespondToFriendRequest()

  const onRespondToFriendshipRequest = (accept: boolean) => () => {
    handleRespondToFriendshipRequest({
      friendId: friendship.friendId,
      accept,
    })
  }

  if (!profile) {
    return <FriendRequestItemSkeleton />
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <UserAvatar profile={profile} />
      </ListItemAvatar>

      <ListItemText>{profile.username}</ListItemText>

      <ListItemIcon>
        <Tooltip title={<Trans>Decline</Trans>}>
          <IconButton onClick={onRespondToFriendshipRequest(false)}>
            <DeclineFriendRequestIcon color='error' />
          </IconButton>
        </Tooltip>

        <Tooltip title={<Trans>Accept</Trans>}>
          <IconButton onClick={onRespondToFriendshipRequest(true)}>
            <AcceptFriendIcon color='success' />
          </IconButton>
        </Tooltip>
      </ListItemIcon>
    </ListItem>
  )
}

export default FriendRequestItem
