import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'

import { FriendProposalProps } from './friend-proposal.types'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { addReceiptContributor } from 'src/helpers/reducers/receipt/receipt.thunk'
import { useAppDispatch } from 'src/redux-hooks'
import { useParams } from 'react-router-dom'

const FriendProposal = ({ friend }: FriendProposalProps) => {
  const dispatch = useAppDispatch()

  const { id } = useParams()

  const handleAddFriend = () => {
    if (id) {
      dispatch(
        addReceiptContributor({ username: friend.username, receiptId: id })
      )
    }
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleAddFriend}>
        <ListItemAvatar>
          <UserAvatar profile={friend} />
        </ListItemAvatar>

        <ListItemText primary={friend.username} sx={{ mr: 2 }} />
      </ListItemButton>
    </ListItem>
  )
}

export default FriendProposal
