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
import FriendProposal from './components/friend-proposal/friend-proposal'
import { selectAllFriendships } from 'src/helpers/reducers/friends/friends.reducer'
import { selectAllProfiles } from 'src/helpers/reducers/profiles/profiles.reducer'
import { useAppSelector } from 'src/redux-hooks'
import { useState } from 'react'

const defaultValues = {
  username: '',
}

const AddContributorItem = ({ contributorsList }: AddContributorItemProps) => {
  const friendships = useAppSelector(selectAllFriendships)

  const formState = useForm({ defaultValues })

  const username = useWatch({ name: 'username', control: formState.control })

  const profiles = useAppSelector(selectAllProfiles)

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
              {friendships
                .filter(({ status }) => status === 'accepted')
                .filter(({ friendId }) => !contributorsList.includes(friendId))
                .flatMap(
                  ({ friendId }) =>
                    profiles.find(({ _id }) => _id === friendId) || []
                )
                .map(({ _id }) => (
                  <FriendProposal key={_id} friendId={_id} />
                ))}
            </List>
          </Paper>
        </Popper>
      </FormProvider>
    </ListItem>
  )
}

export default AddContributorItem
