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
import { removeReceiptContributor } from 'src/helpers/reducers/receipt/receipt.thunk'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useState } from 'react'
import useUserCutCalc from 'src/helpers/hooks/use-user-cut-calc'

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

  const isReady = false
  const isLocked = true

  const dispatch = useAppDispatch()

  const userCut = useUserCutCalc(user, receipt)

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
            {userCut}
          </Typography>
        </Tooltip>
      </ListItemIcon>
    </ListItem>
  )
}

export default ReceiptFriendStatusItem
