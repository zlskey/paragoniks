import { Paper, Stack, TextField, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import AddFriendIcon from '@mui/icons-material/PersonAddAlt1Outlined'
import { LoadingButton } from '@mui/lab'
import { Trans } from '@lingui/macro'
import { sendFriendRequest } from 'src/helpers/services/endpoints/friends/friends.service'
import { useForm } from 'react-hook-form'

const defaultValues = {
  username: '',
}

const AddNewFriendSection = () => {
  const formState = useForm({ defaultValues })

  const queryClient = useQueryClient()

  const {
    mutate: handleAddFriend,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ['friend'],
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friend'] })
      formState.reset()
    },
    onError: (err: any) => {
      const errorMessage = err?.response?.data.error.message

      formState.setError('username', {
        type: 'manual',
        message: errorMessage || 'Something went wrong',
      })
    },
  })

  return (
    <Paper>
      <Stack p={3} spacing={1}>
        <Typography variant='h5'>
          <Trans>Add a new friend</Trans>
        </Typography>

        <form onSubmit={formState.handleSubmit(body => handleAddFriend(body))}>
          <Stack direction='row' spacing={1}>
            <TextField
              spellCheck='false'
              label={<Trans>Username</Trans>}
              variant='filled'
              size='small'
              sx={{ flexGrow: 1 }}
              error={isError}
              disabled={isPending}
              {...formState.register('username')}
            />

            <LoadingButton
              loading={isPending}
              disabled={isPending}
              endIcon={<AddFriendIcon />}
              variant='contained'
              type='submit'
            >
              <Trans>Add</Trans>
            </LoadingButton>
          </Stack>
        </form>

        <Typography variant='body2' color='error'>
          {formState.formState.errors.username?.message}
        </Typography>
      </Stack>
    </Paper>
  )
}

export default AddNewFriendSection
