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
import { useMemo, useState } from 'react'
import { useQueries, useQuery } from '@tanstack/react-query'

import FriendProposal from './components/friend-proposal/friend-proposal'
import { getAllFriendships } from 'src/helpers/api/endpoints/friends/friends.api'
import { getProfile } from 'src/helpers/api/endpoints/profiles/profiles.api'
import { useReceiptContext } from 'src/helpers/contexts/receipt/receipt.context'

const defaultValues = {
  username: '',
}

const AddContributorItem = () => {
  const { receipt } = useReceiptContext()

  const formState = useForm({ defaultValues })

  const username = useWatch({ name: 'username', control: formState.control })

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const { data: friendships } = useQuery({
    queryKey: ['friend'],
    queryFn: getAllFriendships,
    initialData: [],
  })

  const results = useQueries({
    queries: friendships.map(({ friendId }) => ({
      queryKey: ['user', 'profile', { userId: friendId }],
      queryFn: () => getProfile({ userId: friendId }),
    })),
  })

  const profiles = useMemo(
    () => results.flatMap(({ data }) => data || []),
    [results]
  )

  return (
    <ListItem>
      <FormProvider {...formState}>
        <ListItemAvatar>
          <Avatar alt={username ? username : '?'} src='#' />
        </ListItemAvatar>

        <ListItemText>
          <div ref={elm => setAnchorEl(elm)}>
            <InputBase
              placeholder='Aa..'
              fullWidth
              spellCheck={false}
              autoComplete='off'
              disabled={!profiles.length}
              {...formState.register('username')}
            />
          </div>
        </ListItemText>

        <Popper id='simple-popper' anchorEl={anchorEl} open={Boolean(username)}>
          <Paper elevation={5}>
            <List disablePadding>
              {profiles
                .filter(profile => {
                  const contributorsList = receipt.contributors.concat([
                    receipt.owner,
                  ])
                  const friendship = friendships.find(
                    ({ friendId }) => friendId === profile._id
                  )

                  if (!friendship) return false

                  const isContributor = contributorsList.includes(profile._id)
                  const isAcceptedFriend = friendship?.status === 'accepted'

                  return !isContributor && isAcceptedFriend
                })
                .map(profile => (
                  <FriendProposal key={profile._id} profile={profile} />
                ))}
            </List>
          </Paper>
        </Popper>
      </FormProvider>
    </ListItem>
  )
}

export default AddContributorItem
