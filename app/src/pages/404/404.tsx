import { useNavigate } from 'react-router-dom'
import { Button, Grid, Typography } from '@mui/material'

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
        <Typography variant='h2'>Page not found 🔎</Typography>
        <Button onClick={handleGoBack} size='medium'>
          Go back
        </Button>
      </Grid>
    </Grid>
  )
}

export default Page404
