import {
  Box,
  Grid,
  List,
  ListItem,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import ReceiptItem from 'src/pages/home/components/receipt-item'
import { ReceiptItemSkeleton } from 'src/pages/home/components/receipt-item'
import { Trans } from '@lingui/macro'
import UploadReceipt from 'src/pages/home/components/upload-receipt'
import Wrapper from 'src/components/wrapper'
import generateElements from 'src/helpers/utils/generate-elements'
import { getUserReceipts } from 'src/helpers/api/endpoints/receipt/receipt.api'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
  const theme = useTheme()

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))

  const { data: receipts, isLoading } = useQuery({
    queryKey: ['receipt'],
    queryFn: getUserReceipts,
    initialData: [],
    refetchInterval: 1000,
  })

  return (
    <Wrapper>
      <Grid
        container
        spacing={2}
        direction={isLargeScreen ? undefined : 'column-reverse'}
      >
        <Grid item xs={12} md={8}>
          <Paper>
            <Box p={2}>
              <List>
                <ListItem>
                  <Typography variant='h5'>
                    <Trans>Your Receipts</Trans>
                  </Typography>
                </ListItem>

                {isLoading ? (
                  generateElements(<ReceiptItemSkeleton />, 3)
                ) : receipts.length ? (
                  receipts.map(receipt => (
                    <ReceiptItem receipt={receipt} key={receipt._id} />
                  ))
                ) : (
                  <ListItem>
                    <Typography variant='h6'>
                      <Trans>No receipt added yet</Trans>
                    </Typography>
                  </ListItem>
                )}
              </List>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <UploadReceipt />
        </Grid>
      </Grid>
    </Wrapper>
  )
}

export default Home
