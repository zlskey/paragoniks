import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'

import { FriendItemProps } from './friend-item.types'
import RemoveFriendIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'
import { removeFriend } from 'src/helpers/reducers/user/user.thunk'
import { useAppDispatch } from 'src/redux-hooks'

const FriendItem = ({ friend }: FriendItemProps) => {
  const dispatch = useAppDispatch()

  const handleRemoveFriend = () => {
    dispatch(removeFriend(friend.username))
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={friend.username} src='#' />
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
