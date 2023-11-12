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
import { FormProvider, useForm, useWatch } from 'react-hook-form'

import { AddContributorItemProps } from './add-contributor-item.types'
import { Friend } from 'src/types/generic.types'
import FriendProposal from './components/friend-proposal/friend-proposal'
import { selectAllFriends } from 'src/helpers/reducers/friends/friends.reducer'
import { useAppSelector } from 'src/redux-hooks'
import { useState } from 'react'

const defaultValues = {
  username: '',
}

const AddContributorItem = ({ contributorsList }: AddContributorItemProps) => {
  const friends = useAppSelector(selectAllFriends)

  const formState = useForm({ defaultValues })

  const username = useWatch({ name: 'username', control: formState.control })

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  return (
    <ListItem>
      <FormProvider {...formState}>
        <ListItemAvatar>
          <Avatar alt={username ? username : '?'} src='#' />
        </ListItemAvatar>

        <ListItemText>
          <div ref={elm => setAnchorEl(elm)}>
            <InputBase
              placeholder='Username...'
              fullWidth
              spellCheck={false}
              autoComplete='off'
              {...formState.register('username')}
            />
          </div>
        </ListItemText>

        <Popper id='simple-popper' anchorEl={anchorEl} open={Boolean(username)}>
          <Paper elevation={5}>
            <List disablePadding>
              {filterProposals(
                friends.filter(({ _id }) => !contributorsList.includes(_id)),
                username
              ).map(friend => (
                <FriendProposal key={friend.username} friend={friend} />
              ))}
            </List>
          </Paper>
        </Popper>
      </FormProvider>
    </ListItem>
  )
}

const filterProposals = (friends: Friend[], query: string) => {
  const lowerCaseQuery = query.toLowerCase()

  return friends.filter(
    ({ username, status }) =>
      username.toLowerCase().includes(lowerCaseQuery) && status === 'accepted'
  )
}

export default AddContributorItem
