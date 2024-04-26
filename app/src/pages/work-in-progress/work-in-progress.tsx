import { Box, Typography } from '@mui/material'

import { Trans } from '@lingui/macro'
import Wrapper from 'src/components/wrapper/wrapper'

const WorkInProgress = () => {
  return (
    <Wrapper>
      <Box display='grid' height='100vh' sx={{ placeItems: 'center' }}>
        <Typography variant='h4'>
          <Trans>Work in progress</Trans> 🔧
        </Typography>
      </Box>
    </Wrapper>
  )
}

export default WorkInProgress
