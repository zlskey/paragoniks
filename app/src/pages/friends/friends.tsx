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
import {
  selectAllFriends,
  selectFriendsLoading,
} from 'src/helpers/reducers/friends/friends.reducer'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'
import { useEffect, useState } from 'react'

import AddNewFriendSection from 'src/pages/friends/components/add-new-friend-section'
import { Friend } from 'src/types/generic.types'
import FriendRequestItem from 'src/pages/friends/components/friend-request-item'
import Wrapper from 'src/components/wrapper'
import generateElements from 'src/helpers/utils/generate-elements'
import { getAllFriendships } from 'src/helpers/reducers/friends/friends.thunk'

const Friends = () => {
  const isLoading = useAppSelector(selectFriendsLoading) === 'pending'

  const friends = useAppSelector(selectAllFriends)

  const dispatch = useAppDispatch()

  const [accepted, setAccepted] = useState<Friend[]>([])
  const [pending, setPending] = useState<Friend[]>([])

  useEffect(() => {
    setAccepted(friends.filter(friend => friend.status === 'accepted'))
    setPending(friends.filter(friend => friend.status === 'pending'))
  }, [friends])

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
                  <Typography variant='h5'>Friends</Typography>
                </ListItem>

                {isLoading ? (
                  generateElements(<FriendItemSkeleton />, 3)
                ) : accepted.length ? (
                  accepted.map(friend => (
                    <FriendItem key={friend.username} friend={friend} />
                  ))
                ) : (
                  <ListItem>
                    <Typography variant='h6'>No friends yet</Typography>
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
                    <Typography variant='h5'>Inbox</Typography>
                  </ListItem>

                  {pending.length ? (
                    pending.map(friend => (
                      <FriendRequestItem
                        key={friend.username}
                        friend={friend}
                      />
                    ))
                  ) : (
                    <ListItem>
                      <Typography variant='h6'>No requests yet</Typography>
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
