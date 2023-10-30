import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import { Receipt, User } from 'src/types/generic.types'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import RemoveIcon from '@mui/icons-material/PersonRemoveOutlined'
import { getUserCutReducer } from 'src/helpers/utils/get-user-cut-reducer'
import { removeReceiptContributor } from 'src/helpers/reducers/receipt/receipt.thunk'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useState } from 'react'

interface ReceiptFriendStatusItemProps {
  username: User['username']
  receipt: Receipt
}

const ReceiptFriendStatusItem = ({
  username,
  receipt,
}: ReceiptFriendStatusItemProps) => {
  const user = useAppSelector(selectUser)

  if (!user) return

  const percentage =
    (receipt.items.reduce(getUserCutReducer(username), 0) / receipt.sum) * 100
  const isReady = false
  const isLocked = true

  const dispatch = useAppDispatch()

  const [hover, setHover] = useState(false)

  const handleRemoveContributor = () => {
    dispatch(removeReceiptContributor({ username, receiptId: receipt._id }))
  }

  const handleMouseOver = () => setHover(true)
  const handleMouseOut = () => setHover(false)

  return (
    <ListItem>
      <ListItemAvatar onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {hover && username !== user.username ? (
          <Avatar>
            <IconButton onClick={handleRemoveContributor}>
              <RemoveIcon />
            </IconButton>
          </Avatar>
        ) : (
          <Avatar alt={username} src='#' />
        )}
      </ListItemAvatar>

      <ListItemText>{username}</ListItemText>

      <ListItemIcon>
        <Tooltip title={isLocked ? 'Locked' : isReady ? 'Ready' : 'Not Ready'}>
          <Typography color={isLocked ? 'grey' : isReady ? 'green' : 'orange'}>
            {percentage.toFixed(2)}%
          </Typography>
        </Tooltip>
      </ListItemIcon>
    </ListItem>
  )
}

export default ReceiptFriendStatusItem
