import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Tooltip,
} from '@mui/material'

import { Friend } from 'src/types/generic.types'
import RemoveFriendIcon from '@mui/icons-material/PersonRemoveAlt1Outlined'
import { removeFriend } from 'src/helpers/reducers/friends/friends.thunk'
import { useAppDispatch } from 'src/redux-hooks'
import useRandomizedValues from 'src/helpers/hooks/use-randomized-values'

export interface FriendItemProps {
  friend: Friend
}

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

export const FriendItemSkeleton = () => {
  const usernameWidth = useRandomizedValues(50, 100)

  return (
    <ListItem>
      <ListItemAvatar>
        <Skeleton variant='circular' height={40} width={40} />
      </ListItemAvatar>

      <ListItemText
        primary={<Skeleton variant='text' width={usernameWidth} />}
      />

      <ListItemIcon>
        <Skeleton variant='circular' height={40} width={40} />
      </ListItemIcon>
    </ListItem>
  )
}

export default FriendItem
