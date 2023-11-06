import {
  AppBar,
  Avatar,
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
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useAppSelector } from 'src/redux-hooks'

const Header = () => {
  const user = useAppSelector(selectUser)

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
          </Stack>

          <Tooltip title='Open settings'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user?.username} src='#' />
            </IconButton>
          </Tooltip>

          <PopupMenu onClose={handleCloseUserMenu} anchorEl={anchorElUser} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
