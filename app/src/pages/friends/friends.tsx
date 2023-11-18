import {
  Box,
  Grid,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'
import { useEffect, useState } from 'react'

import AddNewFriendSection from 'src/pages/friends/components/add-new-friend-section'
import FriendItem from 'src/pages/friends/components/friend-item'
import FriendRequestItem from 'src/pages/friends/components/friend-request-item'
import { Friendship } from 'src/types/generic.types'
import { Trans } from '@lingui/macro'
import Wrapper from 'src/components/wrapper'
import { getAllFriendships } from 'src/helpers/reducers/friends/friends.thunk'
import { getProfiles } from 'src/helpers/reducers/profiles/profiles.thunk'
import { selectAllFriendships } from 'src/helpers/reducers/friends/friends.reducer'

const Friends = () => {
  const friendships = useAppSelector(selectAllFriendships)

  const dispatch = useAppDispatch()

  const [accepted, setAccepted] = useState<Friendship[]>([])
  const [pending, setPending] = useState<Friendship[]>([])

  useEffect(() => {
    setAccepted(
      friendships.filter(friendship => friendship.status === 'accepted')
    )
    setPending(
      friendships.filter(friendship => friendship.status === 'pending')
    )
  }, [friendships])

  useEffect(() => {
    dispatch(
      getProfiles({
        userIds: friendships.map(friendship => friendship.friendId),
      })
    )
  }, [friendships])

  useEffect(() => {
    dispatch(getAllFriendships({}))
  }, [])

  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box p={1}>
              <List>
                <ListItem>
                  <Typography variant='h5'>
                    <Trans>Friends</Trans>
                  </Typography>
                </ListItem>

                {accepted.length ? (
                  accepted.map(friendship => (
                    <FriendItem key={friendship._id} friendship={friendship} />
                  ))
                ) : (
                  <ListItem>
                    <Typography variant='h6'>
                      <Trans>No friends yet</Trans>
                    </Typography>
                  </ListItem>
                )}
              </List>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <AddNewFriendSection />

            <Paper>
              <Stack p={1}>
                <List>
                  <ListItem>
                    <Typography variant='h5'>
                      <Trans>Inbox</Trans>
                    </Typography>
                  </ListItem>

                  {pending.length ? (
                    pending.map(friendship => (
                      <FriendRequestItem
                        key={friendship._id}
                        friendship={friendship}
                      />
                    ))
                  ) : (
                    <ListItem>
                      <Typography variant='h6'>
                        <Trans>No requests yet</Trans>
                      </Typography>
                    </ListItem>
                  )}
                </List>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Wrapper>
  )
}

export default Friends
