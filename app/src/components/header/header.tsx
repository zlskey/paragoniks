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
import { Trans } from '@lingui/macro'
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
              <Typography mr={3}>
                <Trans>Receipter</Trans>
              </Typography>
            </MuiLink>

            <MenuItem label={<Trans>Home</Trans>} path='/' />

            <MenuItem label={<Trans>Friends</Trans>} path='/friends' />

            <MenuItem label={<Trans>Settings</Trans>} path='/settings' />
          </Stack>

          <Tooltip title={<Trans>Menu</Trans>}>
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
