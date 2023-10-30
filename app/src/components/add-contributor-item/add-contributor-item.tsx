import {
  Avatar,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
} from '@mui/material'
import { useForm, useWatch } from 'react-hook-form'

import { User } from 'src/types/generic.types'
import { addReceiptContributor } from 'src/helpers/reducers/receipt/receipt.thunk'
import { useAppDispatch } from 'src/redux-hooks'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

interface FormState {
  username: string
}

const defaultValues: FormState = { username: '' }

const AddContributorItem = ({ user }: { user: User }) => {
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

  return friends.filter(({ username }) =>
    username.toLowerCase().includes(lowerCaseQuery)
  )
}

const FriendProposal = ({ username }: { username: string }) => {
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

export default AddContributorItem
