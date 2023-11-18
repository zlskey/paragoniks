import { Paper, Stack, TextField, Typography } from '@mui/material'

import AddFriendIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import { LoadingButton } from '@mui/lab'
import { Trans } from '@lingui/macro'
import { sendFriendRequest } from 'src/helpers/reducers/friends/friends.thunk'
import { useAppDispatch } from 'src/redux-hooks'
import { useForm } from 'react-hook-form'

const defaultValues = {
  username: '',
}

const AddNewFriendSection = () => {
  const isLoading = false

  const isFailed = false

  const formState = useForm({ defaultValues })

  const dispatch = useAppDispatch()

  const handleSendFriendshipRequest = ({ username }: typeof defaultValues) => {
    dispatch(sendFriendRequest({ username }))
    formState.reset()
  }

  return (
    <Paper>
      <Stack p={3} spacing={1}>
        <Typography variant='h5'>
          <Trans>Add a new friend</Trans>
        </Typography>

        <form onSubmit={formState.handleSubmit(handleSendFriendshipRequest)}>
          <Stack direction='row' spacing={1}>
            <TextField
              spellCheck='false'
              label={<Trans>Username</Trans>}
              variant='filled'
              size='small'
              sx={{ flexGrow: 1 }}
              error={isFailed}
              {...formState.register('username')}
            />

            <LoadingButton
              loading={isLoading}
              disabled={isLoading}
              endIcon={<AddFriendIcon />}
              variant='contained'
              type='submit'
            >
              <Trans>Add</Trans>
            </LoadingButton>
          </Stack>
        </form>
      </Stack>
    </Paper>
  )
}

export default AddNewFriendSection
