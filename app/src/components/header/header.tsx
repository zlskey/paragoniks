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
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import { logoutUser } from 'src/helpers/reducers/user/user.thunk'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'

const Header = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const user = useAppSelector(selectUser)

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    dispatch(logoutUser())
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
              <Avatar alt={user?.username} src='#' />
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
