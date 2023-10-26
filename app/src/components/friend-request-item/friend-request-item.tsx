import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'

import AcceptFriendIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import DeclineFriendRequestIcon from '@mui/icons-material/PersonOffOutlined'
import { Friend } from 'src/types/generic.types'
import { respondToFriendRequest } from 'src/helpers/reducers/user/user.thunk'
import { useAppDispatch } from 'src/redux-hooks'

interface FriendRequestItemProps {
  friend: Friend
}

const FriendRequestItem = ({ friend }: FriendRequestItemProps) => {
  const dispatch = useAppDispatch()

  const handleRespondToFriendshipRequest = (accept: boolean) => () => {
    dispatch(
      respondToFriendRequest({
        username: friend.username,
        accept,
      })
    )
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={friend.username} src={friend.image} />
      </ListItemAvatar>

      <ListItemText>{friend.username}</ListItemText>

      <ListItemIcon>
        <Tooltip title='Decline'>
          <IconButton onClick={handleRespondToFriendshipRequest(false)}>
            <DeclineFriendRequestIcon color='error' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Accept'>
          <IconButton onClick={handleRespondToFriendshipRequest(true)}>
            <AcceptFriendIcon color='success' />
          </IconButton>
        </Tooltip>
      </ListItemIcon>
    </ListItem>
  )
}

export default FriendRequestItem
