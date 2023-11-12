import {
  AppBar,
  Container,
  IconButton,
  Link as MuiLink,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import MenuItem from './components/menu-item'
import PopupMenu from './components/popup-menu/popup-menu'
import UserAvatar from '../user-avatar/user-avatar'

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar component='nav'>
      <Container>
        <Toolbar disableGutters>
          <Stack sx={{ flexGrow: 1 }} direction='row' alignItems='center'>
            <MuiLink component={Link} to='/' underline='none' color='white'>
              <Typography mr={3}>Roommate Shopper</Typography>
            </MuiLink>

            <MenuItem label='Home' path='/' />

            <MenuItem label='Friends' path='/friends' />

            <MenuItem label='Settings' path='/settings' />
          </Stack>

          <Tooltip title='Open settings'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <UserAvatar />
            </IconButton>
          </Tooltip>

          <PopupMenu onClose={handleCloseUserMenu} anchorEl={anchorElUser} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
