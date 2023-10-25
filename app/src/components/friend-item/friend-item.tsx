import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'

import RemoveFriendIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'

const FriendItem = () => {
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
        <Tooltip title='Remove friend'>
          <IconButton>
            <RemoveFriendIcon />
          </IconButton>
        </Tooltip>
      </ListItemIcon>
    </ListItem>
  )
}

export default FriendItem
