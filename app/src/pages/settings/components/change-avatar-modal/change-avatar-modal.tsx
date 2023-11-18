import { Avatar, Divider, IconButton, Stack, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import {
  changeAvatarColor,
  changeAvatarImage,
} from 'src/helpers/reducers/user/user.thunk'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import { AvatarColor } from 'src/types/generic.types'
import SettingsModal from '../settings-modal'
import { Trans } from '@lingui/macro'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useNavigate } from 'react-router-dom'

const defaultValues: { files: FileList | null } = { files: null }

const ChangeAvatarModal = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectUser)

  const navigate = useNavigate()

  const formState = useForm({ defaultValues })

  const onSubmit = ({ files }: typeof defaultValues) => {
    files && dispatch(changeAvatarImage({ image: files[0] }))

    formState.reset()
    navigate('#')
  }

  const selectColor = (color: AvatarColor) => () => {
    dispatch(changeAvatarColor({ color }))
  }

  if (!user) return null

  return (
    <SettingsModal id='avatar' title={<Trans>Customize your avatar!</Trans>}>
      <form onSubmit={formState.handleSubmit(onSubmit)}>
        <FormProvider {...formState}>
          <Stack spacing={2}>
            <Divider />

            <Stack alignItems='center' spacing={1}>
              <Typography variant='h6'>
                <Trans>Your current avatar:</Trans>
              </Typography>

              <UserAvatar />
            </Stack>

            <Stack>
              <Typography>
                <Trans>Choose a color</Trans>
              </Typography>

              <Stack direction='row' justifyContent='space-evenly'>
                {Object.values(AvatarColor).map(color => (
                  <IconButton key={color} onClick={selectColor(color)}>
                    <Avatar
                      alt={user.username?.charAt(0).toUpperCase()}
                      src='#'
                      sx={{ bgcolor: color, width: 40, height: 40 }}
                    />
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </FormProvider>
      </form>
    </SettingsModal>
  )
}

export default ChangeAvatarModal
