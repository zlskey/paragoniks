import { Button, Card, Container, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import LoginForm from 'src/pages/auth/components/login-form'
import SignupForm from 'src/pages/auth/components/signup-form'
import { Trans } from '@lingui/macro'
import { useIsLoggedIn } from 'src/helpers/contexts/current-user/current-user.context'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [isLogining, setIsLogining] = useState(true)

  const isLoggedIn = useIsLoggedIn()

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true })
    }
  }, [isLoggedIn])

  return (
    <Grid height='100vh' container alignItems='center' justifyContent='center'>
      <Container maxWidth='sm'>
        <Card>
          <Stack spacing={2} p={2}>
            <Typography textAlign='center' variant='h4'>
              {isLogining ? <Trans>Login</Trans> : <Trans>Signup</Trans>}
            </Typography>

            {isLogining ? <LoginForm /> : <SignupForm />}

            {isLogining ? (
              <Typography textAlign='right'>
                <Trans>Don't have account yet?</Trans>
                <Button onClick={() => setIsLogining(false)} variant='text'>
                  <Trans>Signup Here</Trans>
                </Button>
              </Typography>
            ) : (
              <Typography textAlign='right'>
                <Trans>Already have an account?</Trans>
                <Button onClick={() => setIsLogining(true)} variant='text'>
                  <Trans>Login Here</Trans>
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
