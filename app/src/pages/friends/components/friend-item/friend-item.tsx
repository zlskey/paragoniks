import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'

import { FriendItemProps } from './friend-item.types'
import RemoveFriendIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { removeFriend } from 'src/helpers/reducers/friends/friends.thunk'
import { useAppDispatch } from 'src/redux-hooks'

const FriendItem = ({ friend }: FriendItemProps) => {
  const dispatch = useAppDispatch()

  const handleRemoveFriend = () => {
    dispatch(removeFriend({ friendId: friend._id }))
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <UserAvatar userId={friend._id} />
      </ListItemAvatar>

      <ListItemText>{friend.username}</ListItemText>

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
