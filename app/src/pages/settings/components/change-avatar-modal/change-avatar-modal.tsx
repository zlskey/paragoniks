import { Avatar, Divider, IconButton, Stack, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import {
  changeAvatarColor,
  changeAvatarImage,
} from 'src/helpers/api/endpoints/user/user.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AvatarColor } from 'src/types/generic.types'
import SettingsModal from '../settings-modal'
import { Trans } from '@lingui/macro'
import UserAvatar from 'src/components/user-avatar/user-avatar'
import { useNavigate } from 'react-router-dom'
import { useUser } from 'src/helpers/contexts/current-user/current-user.context'

const defaultValues: { files: FileList | null } = { files: null }

const ChangeAvatarModal = () => {
  const user = useUser()

  const navigate = useNavigate()

  const formState = useForm({ defaultValues })

  const queryClient = useQueryClient()

  const { mutate: handleChangeAvatarImage } = useMutation({
    mutationKey: ['user', 'avatar', 'image'],
    mutationFn: changeAvatarImage,
    onSuccess: user => {
      queryClient.setQueryData(['user', 'whoami'], user)
      formState.reset()
      navigate('#')
    },
  })

  const { mutate: handleChangeAvatarColor } = useMutation({
    mutationKey: ['user', 'avatar', 'color'],
    mutationFn: changeAvatarColor,
    onSuccess: user => {
      queryClient.setQueryData(['user', 'whoami'], user)
    },
  })

  const onSubmit = ({ files }: typeof defaultValues) => {
    files && handleChangeAvatarImage({ image: files[0] })
  }

  const selectColor = (color: AvatarColor) => () => {
    handleChangeAvatarColor({ color })
  }

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

              <UserAvatar profile={user} />
            </Stack>

            <Stack>
              <Typography>
                <Trans>Choose a color</Trans>
              </Typography>

              <Stack
                direction='row'
                justifyContent='space-evenly'
                flexWrap='wrap'
              >
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
