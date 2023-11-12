import { Button, Card, Container, Grid, Stack, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'
import { useEffect, useState } from 'react'

import LoginForm from 'src/pages/auth/components/login-form'
import SignupForm from 'src/pages/auth/components/signup-form'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useNavigate } from 'react-router-dom'
import { whoamiUser } from 'src/helpers/reducers/user/user.thunk'

const Auth = () => {
  const [isLogining, setIsLogining] = useState(true)

  const user = useAppSelector(selectUser)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(whoamiUser({}))
  }, [])

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  return (
    <Grid height='100vh' container alignItems='center' justifyContent='center'>
      <Container maxWidth='sm'>
        <Card>
          <Stack spacing={2} p={2}>
            <Typography textAlign='center' variant='h4'>
              Authentication
            </Typography>

            {isLogining ? <LoginForm /> : <SignupForm />}

            {isLogining ? (
              <Typography textAlign='right'>
                Don't have account yet?
                <Button onClick={() => setIsLogining(false)} variant='text'>
                  Signup Here
                </Button>
              </Typography>
            ) : (
              <Typography textAlign='right'>
                Already have an account?
                <Button onClick={() => setIsLogining(true)} variant='text'>
                  Login Here
                </Button>
              </Typography>
            )}
          </Stack>
        </Card>
      </Container>
    </Grid>
  )
}

export default Auth
