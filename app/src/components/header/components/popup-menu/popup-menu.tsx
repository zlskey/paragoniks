import { Menu, MenuItem, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { PopupMenuProps } from './popup-menu.types'
import { Trans } from '@lingui/macro'
import { logoutUser } from 'src/helpers/services/endpoints/user/user.service'
import { useUser } from 'src/helpers/contexts/current-user/current-user.context'

const PopupMenu = ({ anchorEl, onClose }: PopupMenuProps) => {
  const user = useUser()

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['user', 'logout'],
    mutationFn: logoutUser,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['user', 'whoami'] })

      queryClient.setQueryData(['user', 'whoami'], null)

      return { previousUser: user }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'whoami'] })
    },
  })

  return (
    <Menu
      id='menu-appbar'
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      keepMounted
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{ mt: '45px' }}
    >
      <MenuItem onClick={mutate}>
        <Typography textAlign='center'>
          <Trans>Logout</Trans>
        </Typography>
      </MenuItem>
    </Menu>
  )
}

export default PopupMenu
