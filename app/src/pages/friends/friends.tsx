import {
  Box,
  Grid,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import FriendItem, {
  FriendItemSkeleton,
} from 'src/pages/friends/components/friend-item'
import { useEffect, useState } from 'react'

import AddNewFriendSection from 'src/pages/friends/components/add-new-friend-section'
import FriendRequestItem from 'src/pages/friends/components/friend-request-item'
import { Friendship } from 'src/types/generic.types'
import { Trans } from '@lingui/macro'
import Wrapper from 'src/components/wrapper'
import generateElements from 'src/helpers/utils/generate-elements'
import { getAllFriendships } from 'src/helpers/services/endpoints/friends/friends.service'
import { useQuery } from '@tanstack/react-query'

const Friends = () => {
  const { data: friendships, isLoading } = useQuery({
    queryKey: ['friend'],
    queryFn: getAllFriendships,
    refetchInterval: 2000,
  })

  const [accepted, setAccepted] = useState<Friendship[]>([])
  const [pending, setPending] = useState<Friendship[]>([])

  useEffect(() => {
    if (!friendships) return

    setAccepted(
      friendships.filter(friendship => friendship.status === 'accepted')
    )
    setPending(
      friendships.filter(friendship => friendship.status === 'pending')
    )
  }, [friendships])

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

                {isLoading ? (
                  generateElements(<FriendItemSkeleton />, 3)
                ) : accepted.length ? (
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

                  {isLoading ? (
                    generateElements(<FriendItemSkeleton />, 1)
                  ) : pending.length ? (
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
