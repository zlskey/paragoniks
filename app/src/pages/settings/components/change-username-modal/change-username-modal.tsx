import { Stack, TextField } from '@mui/material'
import {
  selectUserError,
  selectUserLoading,
} from 'src/helpers/reducers/user/user.reducer'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import { LoadingButton } from '@mui/lab'
import SettingsModal from '../settings-modal'
import { changeUsername } from 'src/helpers/reducers/user/user.thunk'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { usernameSchema } from 'src/helpers/utils/user-validation-schema'
import { yupResolver } from '@hookform/resolvers/yup'

const defaultValues = {
  username: '',
}

const ChangeUsernameModal = () => {
  const dispatch = useAppDispatch()

  const error = useAppSelector(selectUserError)

  const isLoading = useAppSelector(selectUserLoading) === 'pending'

  const navigate = useNavigate()

  const formState = useForm({
    defaultValues,
    resolver: yupResolver(usernameSchema),
  })

  const onSubmit = ({ username }: typeof defaultValues) => {
    dispatch(changeUsername({ username }))
    formState.reset()
    navigate('#')
  }

  return (
    <SettingsModal id='username' title='Change username'>
      <form onSubmit={formState.handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label='New username'
            error={!!formState.formState.errors.username || !!error}
            {...formState.register('username')}
          />

          <Stack direction='row' justifyContent='flex-end'>
            <LoadingButton
              disabled={isLoading}
              loading={isLoading}
              variant='contained'
              type='submit'
            >
              Confirm
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </SettingsModal>
  )
}

export default ChangeUsernameModal
