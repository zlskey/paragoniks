import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material'

import { FriendProposalProps } from './friend-proposal.types'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import useAddContributor from './use-add-contributor'
import { useFormContext } from 'react-hook-form'

const FriendProposal = ({ profile }: FriendProposalProps) => {
  const { reset } = useFormContext()

  const handleAddContributor = useAddContributor()

  const onAddContributor = () => {
    handleAddContributor(profile._id)
    reset()
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onAddContributor}>
        <ListItemAvatar>
          <UserAvatar profile={profile} />
        </ListItemAvatar>

        <ListItemText primary={profile.username} sx={{ mr: 2 }} />
      </ListItemButton>
    </ListItem>
  )
}

export default FriendProposal
