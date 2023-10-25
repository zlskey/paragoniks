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

const FriendRequestItem = () => {
  const friend = {
    imagePath: undefined,
    username: 'Someone',
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt='Friend avatar' src={friend.imagePath}>
          {friend.username.charAt(0)}
        </Avatar>
      </ListItemAvatar>

      <ListItemText>{friend.username}</ListItemText>

      <ListItemIcon>
        <Tooltip title='Decline'>
          <IconButton>
            <DeclineFriendRequestIcon color='error' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Accept'>
          <IconButton>
            <AcceptFriendIcon color='success' />
          </IconButton>
        </Tooltip>
      </ListItemIcon>
    </ListItem>
  )
}

export default FriendRequestItem
