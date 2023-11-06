import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'

import { FriendProposalProps } from './friend-proposal.types'
import { addReceiptContributor } from 'src/helpers/reducers/receipt/receipt.thunk'
import { useAppDispatch } from 'src/redux-hooks'
import { useParams } from 'react-router-dom'

const FriendProposal = ({ username }: FriendProposalProps) => {
  const dispatch = useAppDispatch()

  const { id } = useParams()

  const handleAddFriend = () => {
    if (id) {
      dispatch(addReceiptContributor({ username, receiptId: id }))
    }
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleAddFriend}>
        <ListItemAvatar>
          <Avatar alt={username} src='#' />
        </ListItemAvatar>

        <ListItemText primary={username} sx={{ mr: 2 }} />
      </ListItemButton>
    </ListItem>
  )
}

export default FriendProposal
