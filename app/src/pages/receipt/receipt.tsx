import { Grid, InputBase, List, Paper, Stack, Typography } from '@mui/material'

import ReceiptFriendStatusItem from 'src/components/receipt-friend-status-item'
import ReceiptListItem from 'src/components/receipt-list-item'
import ReceiptStatusButton from 'src/components/receipt-status-button'
import Wrapper from 'src/components/wrapper/wrapper'
import { getPrice } from 'src/helpers/utils/get-price'

const Receipt = () => {
  return (
    <Wrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper>
            <List>
              <ReceiptListItem />
              <ReceiptListItem />
              <ReceiptListItem />
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Paper>
              <InputBase
                value='Lidl 20-20-2000'
                sx={{ fontSize: theme => theme.typography.h5, p: 1 }}
              />
            </Paper>

            <Paper>
              <Grid container p={2} spacing={1}>
                <Grid item>
                  <Typography textAlign='left' variant='h5'>
                    Your cut:
                  </Typography>

                  <Typography color='GrayText' textAlign='left' variant='h6'>
                    Receipt total:
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant='h5'>{getPrice(1)}</Typography>
                  <Typography color='GrayText' variant='h6'>
                    {getPrice(10)}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper>
              <List>
                <ReceiptFriendStatusItem />
                <ReceiptFriendStatusItem />
                <ReceiptFriendStatusItem />
                <ReceiptStatusButton />
              </List>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Wrapper>
  )
}

export default Receipt
