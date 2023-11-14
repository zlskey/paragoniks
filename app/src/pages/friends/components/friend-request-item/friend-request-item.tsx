import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import AcceptFriendIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import DeclineFriendRequestIcon from '@mui/icons-material/PersonOffOutlined'
import { FriendRequestItemProps } from './friend-request-item.types'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { respondToFriendRequest } from 'src/helpers/reducers/friends/friends.thunk'
import { selectSingleProfile } from 'src/helpers/reducers/profiles/profiles.reducer'

const FriendRequestItem = ({ friendship }: FriendRequestItemProps) => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectSingleProfile(friendship.friendId))

  const handleRespondToFriendshipRequest = (accept: boolean) => () => {
    dispatch(
      respondToFriendRequest({
        friendId: friendship._id,
        accept,
      })
    )
  }

  if (!profile) {
    return null
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <UserAvatar userId={friendship._id} />
      </ListItemAvatar>

      <ListItemText>{profile.username}</ListItemText>

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
