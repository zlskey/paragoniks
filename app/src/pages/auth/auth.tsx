import {
  Button,
  Card,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { login, selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import { user as mockupUser } from 'src/mockups/user'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(selectUser)

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [user])

  const handleLogin = () => {
    dispatch(login(mockupUser))
  }

  return (
    <Grid height='100vh' container alignItems='center' justifyContent='center'>
      <Container maxWidth='sm'>
        <Card>
          <Stack spacing={2} p={2}>
            <Typography variant='h4'>Authentication</Typography>

            <TextField spellCheck='false' label='Username' variant='filled' />
            <TextField spellCheck='false' label='Password' variant='filled' />

            <Stack direction='row' alignItems='center' justifyContent='center'>
              <Button onClick={handleLogin} variant='contained'>
                Login
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Container>
    </Grid>
  )
}

export default Auth
