import { Menu, MenuItem, Typography } from '@mui/material'

import { PopupMenuProps } from './popup-menu.types'
import { logoutUser } from 'src/helpers/reducers/user/user.thunk'
import { useAppDispatch } from 'src/redux-hooks'

const PopupMenu = ({ anchorEl, onClose }: PopupMenuProps) => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

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
      <MenuItem onClick={handleLogout}>
        <Typography textAlign='center'>Logout</Typography>
      </MenuItem>
    </Menu>
  )
}

export default PopupMenu
