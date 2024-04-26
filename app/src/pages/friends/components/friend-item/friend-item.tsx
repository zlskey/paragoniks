import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'

import { FriendItemProps } from './friend-item.types'
import { FriendItemSkeleton } from '.'
import RemoveFriendIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'
import { Trans } from '@lingui/macro'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { getProfile } from 'src/helpers/api/endpoints/profiles/profiles.api'
import { useQuery } from '@tanstack/react-query'
import useRemoveFriend from './use-remove-friend'

const FriendItem = ({ friendship: { friendId } }: FriendItemProps) => {
  const { data: profile } = useQuery({
    queryKey: ['user', 'profile', { userId: friendId }],
    queryFn: () => getProfile({ userId: friendId }),
    initialData: null,
  })

  const handleRemoveFriend = useRemoveFriend()

  const onRemoveFriend = () => {
    handleRemoveFriend({ friendId })
  }

  if (!profile) {
    return <FriendItemSkeleton />
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <UserAvatar profile={profile} />
      </ListItemAvatar>

      <ListItemText>{profile.username}</ListItemText>

      <ListItemIcon>
        <Tooltip title={<Trans>Remove friend</Trans>}>
          <IconButton onClick={onRemoveFriend}>
            <RemoveFriendIcon />
          </IconButton>
        </Tooltip>
      </ListItemIcon>
    </ListItem>
  )
}

export default FriendItem
