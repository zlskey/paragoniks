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
import {
  selectAllReceipts,
  selectReceiptLoading,
} from 'src/helpers/reducers/receipt/receipt.reducer'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'

import ReceiptItem from 'src/pages/home/components/receipt-item'
import { ReceiptItemSkeleton } from 'src/pages/home/components/receipt-item'
import UploadReceipt from 'src/pages/home/components/upload-receipt'
import Wrapper from 'src/components/wrapper'
import generateElements from 'src/helpers/utils/generate-elements'
import { getUserReceipts } from 'src/helpers/reducers/receipt/receipt.thunk'
import { useEffect } from 'react'

const Home = () => {
  const theme = useTheme()

  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))

  const receipts = useAppSelector(selectAllReceipts)

  const status = useAppSelector(selectReceiptLoading)

  const dispatch = useAppDispatch()

  const isLoading = status === 'pending'

  useEffect(() => {
    dispatch(getUserReceipts())
  }, [])

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
                  <Typography variant='h5'>Your receipts</Typography>
                </ListItem>

                {isLoading ? (
                  generateElements(<ReceiptItemSkeleton />, 3)
                ) : receipts.length ? (
                  receipts.map(receipt => (
                    <ReceiptItem receipt={receipt} key={receipt._id} />
                  ))
                ) : (
                  <ListItem>
                    <Typography variant='h6'>No receipt added yet</Typography>
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
