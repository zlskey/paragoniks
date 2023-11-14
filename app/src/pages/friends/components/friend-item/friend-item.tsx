import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import { FriendItemProps } from './friend-item.types'
import { FriendItemSkeleton } from '.'
import RemoveFriendIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { removeFriend } from 'src/helpers/reducers/friends/friends.thunk'
import { selectSingleProfile } from 'src/helpers/reducers/profiles/profiles.reducer'

const FriendItem = ({ friendship }: FriendItemProps) => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectSingleProfile(friendship.friendId))

  const handleRemoveFriend = () => {
    dispatch(removeFriend({ friendId: friendship.friendId }))
  }

  if (!profile) {
    return <FriendItemSkeleton />
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <UserAvatar userId={profile._id} />
      </ListItemAvatar>

      <ListItemText>{profile.username}</ListItemText>

      <ListItemIcon>
        <Tooltip title='Remove friend'>
          <IconButton onClick={handleRemoveFriend}>
            <RemoveFriendIcon />
          </IconButton>
        </Tooltip>
      </ListItemIcon>
    </ListItem>
  )
}

export default FriendItem
