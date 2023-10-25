import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import AddFriendIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import FriendItem from 'src/components/friend-item'
import FriendRequestItem from 'src/components/friend-request-item'
import Wrapper from 'src/components/wrapper'
import generateElements from 'src/helpers/utils/generate-elements'

const Friends = () => {
  const requests = []
  const friends = []

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

                {friends.length ? (
                  generateElements(<FriendItem />, 2)
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
            <Paper>
              <Stack p={3} spacing={1}>
                <Typography variant='h5'>Add a new friend</Typography>

                <Stack direction='row' spacing={1}>
                  <TextField
                    spellCheck='false'
                    label='Username'
                    variant='filled'
                    size='small'
                    sx={{ flexGrow: 1 }}
                  />

                  <Button endIcon={<AddFriendIcon />} variant='contained'>
                    Add
                  </Button>
                </Stack>
              </Stack>
            </Paper>

            <Paper>
              <Stack p={1}>
                <List>
                  <ListItem>
                    <Typography variant='h5'>Inbox</Typography>
                  </ListItem>

                  {requests.length ? (
                    generateElements(<FriendRequestItem />, 2)
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
