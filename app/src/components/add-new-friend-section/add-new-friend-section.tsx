import { Paper, Stack, TextField, Typography } from '@mui/material'

import AddFriendIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import { LoadingButton } from '@mui/lab'
import { sendFriendRequest } from 'src/helpers/reducers/user/user.thunk'
import { useAppDispatch } from 'src/redux-hooks'
import { useForm } from 'react-hook-form'

interface FormValues {
  username: string
}

const defaultValues: FormValues = {
  username: '',
}

const AddNewFriendSection = () => {
  const isLoading = false

  const isFailed = false

  const formState = useForm({ defaultValues })

  const dispatch = useAppDispatch()

  const handleSendFriendshipRequest = (data: FormValues) => {
    formState.reset()
    dispatch(sendFriendRequest(data.username))
  }

  return (
    <Paper>
      <Stack p={3} spacing={1}>
        <Typography variant='h5'>Add a new friend</Typography>

        <form onSubmit={formState.handleSubmit(handleSendFriendshipRequest)}>
          <Stack direction='row' spacing={1}>
            <TextField
              spellCheck='false'
              label='Username'
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
              Add
            </LoadingButton>
          </Stack>
        </form>
        <Typography color='red'></Typography>
      </Stack>
    </Paper>
  )
}

export default AddNewFriendSection
