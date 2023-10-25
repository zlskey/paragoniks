import {
  AppBar,
  Avatar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Link as MuiLink,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import React from 'react'
import { logout } from 'src/helpers/reducers/user/user.reducer'
import { useAppDispatch } from 'src/redux-hooks'

const Header = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const navigateTo = (path: string) => () => {
    navigate(path)
  }

  return (
    <AppBar component='nav'>
      <Container>
        <Toolbar disableGutters>
          <Stack sx={{ flexGrow: 1 }} direction='row' alignItems='center'>
            <MuiLink component={Link} to='/' underline='none' color='white'>
              <Typography mr={3}>Roommate Shopper</Typography>
            </MuiLink>

            <MenuItem onClick={navigateTo('/')}>
              <Typography textAlign='center'>Home</Typography>
            </MenuItem>

            <MenuItem onClick={navigateTo('/friends')}>
              <Typography textAlign='center'>Friends</Typography>
            </MenuItem>
          </Stack>

          <Tooltip title='Open settings'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleLogout}>
              <Typography textAlign='center'>Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
