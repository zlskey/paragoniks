import { Button, Grid, Typography } from '@mui/material'

import { Trans } from '@lingui/macro'
import { useNavigate } from 'react-router-dom'

const Page404 = () => {
  const navigate = useNavigate()

  const handleGoBack = () => navigate(-1)

  return (
    <Grid
      container
      width='100vw'
      height='100vh'
      justifyContent='center'
      alignItems='center'
    >
      <Grid item>
        <Typography variant='h2'>
          <Trans>Page not found 🔎</Trans>
        </Typography>
        <Button onClick={handleGoBack} size='medium'>
          <Trans>Go back</Trans>
        </Button>
      </Grid>
    </Grid>
  )
}

export default Page404
