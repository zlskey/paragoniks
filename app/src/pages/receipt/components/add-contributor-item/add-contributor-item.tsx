import {
  Avatar,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Popper,
} from '@mui/material'
import { useForm, useWatch } from 'react-hook-form'

import { AddContributorItemProps } from './add-contributor-item.types'
import FriendProposal from './components/friend-proposal/friend-proposal'
import { User } from 'src/types/generic.types'
import { useState } from 'react'

const defaultValues = {
  username: '',
}

const AddContributorItem = ({ user }: AddContributorItemProps) => {
  const { control, register } = useForm({ defaultValues })

  const username = useWatch({ name: 'username', control })

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={username ? username : '?'} src='#' />
      </ListItemAvatar>

      <ListItemText>
        <div ref={elm => setAnchorEl(elm)}>
          <InputBase
            fullWidth
            spellCheck={false}
            autoComplete='off'
            {...register('username')}
          />
        </div>
      </ListItemText>

      <Popper id='simple-popper' anchorEl={anchorEl} open={Boolean(username)}>
        <Paper elevation={5}>
          <List disablePadding>
            {filterProposals(user.friends, username).map(friend => (
              <FriendProposal
                key={friend.username}
                username={friend.username}
              />
            ))}
          </List>
        </Paper>
      </Popper>
    </ListItem>
  )
}

const filterProposals = (friends: User['friends'], query: string) => {
  const lowerCaseQuery = query.toLowerCase()

  return friends.filter(
    ({ username, status }) =>
      username.toLowerCase().includes(lowerCaseQuery) && status === 'accepted'
  )
}

export default AddContributorItem
