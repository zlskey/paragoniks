import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'

import { FriendProposalProps } from './friend-proposal.types'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { addContributor } from 'src/helpers/reducers/receipt/receipt.thunk'
import { useAppDispatch } from 'src/redux-hooks'
import { useFormContext } from 'react-hook-form'
import { useParams } from 'react-router-dom'

const FriendProposal = ({ friend }: FriendProposalProps) => {
  const dispatch = useAppDispatch()

  const { reset } = useFormContext()

  const { receiptId } = useParams()

  const handleAddFriend = () => {
    if (receiptId) {
      dispatch(addContributor({ contributorId: friend._id, receiptId }))
      reset()
    }
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleAddFriend}>
        <ListItemAvatar>
          <UserAvatar userId={friend._id} />
        </ListItemAvatar>

        <ListItemText primary={friend.username} sx={{ mr: 2 }} />
      </ListItemButton>
    </ListItem>
  )
}

export default FriendProposal
