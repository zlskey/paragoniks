import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import { FriendProposalProps } from './friend-proposal.types'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { addContributor } from 'src/helpers/reducers/receipt/receipt.thunk'
import { selectSingleProfile } from 'src/helpers/reducers/profiles/profiles.reducer'
import { useFormContext } from 'react-hook-form'
import { useParams } from 'react-router-dom'

const FriendProposal = ({ friendId }: FriendProposalProps) => {
  const dispatch = useAppDispatch()

  const profile = useAppSelector(selectSingleProfile(friendId))

  const { reset } = useFormContext()

  const { receiptId } = useParams()

  const handleAddFriend = () => {
    if (receiptId) {
      dispatch(addContributor({ contributorId: friendId, receiptId }))
      reset()
    }
  }

  if (!profile) {
    return null
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleAddFriend}>
        <ListItemAvatar>
          <UserAvatar userId={profile._id} />
        </ListItemAvatar>

        <ListItemText primary={profile.username} sx={{ mr: 2 }} />
      </ListItemButton>
    </ListItem>
  )
}

export default FriendProposal
