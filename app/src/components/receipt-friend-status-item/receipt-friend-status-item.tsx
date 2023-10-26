import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'

const ReceiptFriendStatusItem = () => {
  const isReady = false
  const isLocked = true

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>S</Avatar>
      </ListItemAvatar>

      <ListItemText>Someone</ListItemText>

      <ListItemIcon>
        <Tooltip title={isLocked ? 'Locked' : isReady ? 'Ready' : 'Not Ready'}>
          <Typography color={isLocked ? 'grey' : isReady ? 'green' : 'orange'}>
            10%
          </Typography>
        </Tooltip>
      </ListItemIcon>
    </ListItem>
  )
}

export default ReceiptFriendStatusItem
