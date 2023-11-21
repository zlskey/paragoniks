import { Stack, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { LoadingButton } from '@mui/lab'
import SettingsModal from '../settings-modal'
import { Trans } from '@lingui/macro'
import { changeUsername } from 'src/helpers/services/endpoints/user/user.service'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { usernameSchema } from 'src/helpers/utils/user-validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'

const defaultValues = {
  username: '',
}

const ChangeUsernameModal = () => {
  const navigate = useNavigate()

  const formState = useForm({
    defaultValues,
    resolver: yupResolver(usernameSchema),
  })

  const queryClient = useQueryClient()

  const {
    mutate: onSubmit,
    isError,
    isPending,
  } = useMutation({
    mutationKey: ['user', 'username'],
    mutationFn: changeUsername,
    onSuccess: user => {
      queryClient.setQueryData(['user', 'whoami'], user)
      formState.reset()
      navigate('#')
    },
    onError: (err: any) => {
      if (err.response.data.error.message) {
        formState.setError('username', {
          type: 'manual',
          message: err.response.data.error.message,
        })
      }
    },
  })

  return (
    <SettingsModal id='username' title={<Trans>Change username</Trans>}>
      <form onSubmit={formState.handleSubmit(data => onSubmit(data))}>
        <Stack spacing={2}>
          <TextField
            label={<Trans>New username</Trans>}
            error={!!formState.formState.errors.username || isError}
            helperText={formState.formState.errors.username?.message}
            {...formState.register('username')}
          />

          <Stack direction='row' justifyContent='flex-end'>
            <LoadingButton
              disabled={isPending}
              loading={isPending}
              variant='contained'
              type='submit'
            >
              <Trans>Confirm</Trans>
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </SettingsModal>
  )
}

export default ChangeUsernameModal
