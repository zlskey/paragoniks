import { Grid, List, Paper, Stack, Typography } from '@mui/material'
import ReceiptFriendStatusItem, {
  ReceiptFriendStatusItemSkeleton,
} from 'src/components/receipt-friend-status-item'
import {
  selectReceiptLoading,
  selectSingleReceipt,
} from 'src/helpers/reducers/receipt/receipt.reducer'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'
import { useEffect, useState } from 'react'

import AddContributorItem from 'src/components/add-contributor-item/add-contributor-item'
import { Item } from 'src/types/generic.types'
import ItemEditDialog from 'src/components/item-edit-dialog/item-edit-dialog'
import ReceiptListItem from 'src/components/receipt-list-item'
import ReceiptStatusButton from 'src/components/receipt-status-button'
import ReceiptTitleInput from 'src/components/receipt-title-input/receipt-title-input'
import Wrapper from 'src/components/wrapper/wrapper'
import generateElements from 'src/helpers/utils/generate-elements'
import { getPrice } from 'src/helpers/utils/get-price'
import { getSingleReceipt } from 'src/helpers/reducers/receipt/receipt.thunk'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useParams } from 'react-router-dom'
import useUserCutCalc from 'src/helpers/hooks/use-user-cut-calc'

const Receipt = () => {
  const { id } = useParams()

  if (!id) {
    return
  }

  const dispatch = useAppDispatch()

  const receipt = useAppSelector(selectSingleReceipt(id))

  const isLoading = useAppSelector(selectReceiptLoading) === 'pending'

  const user = useAppSelector(selectUser)

  const userCut = useUserCutCalc(user, receipt)

  const [editedItem, setEditedItem] = useState<null | Item>(null)

  useEffect(() => {
    if (!receipt) {
      dispatch(getSingleReceipt(id))
    }
  }, [])

  if (!receipt || !user) {
    return null
  }

  const handleSetEditedItem = (item: Item) => {
    setEditedItem(item)
  }

  const handleClearEditedItem = () => {
    setEditedItem(null)
  }

  const allContributors = [receipt.owner, ...receipt.others]

  return (
    <Wrapper>
      <ItemEditDialog
        receiptId={receipt._id}
        item={editedItem}
        onClose={handleClearEditedItem}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper>
            <List>
              {receipt.items.map(item => (
                <ReceiptListItem
                  onEdit={handleSetEditedItem}
                  isOwner={user.username === receipt.owner}
                  key={item._id}
                  item={item}
                />
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <ReceiptTitleInput user={user} receipt={receipt} />

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
                  <Typography variant='h5'>{userCut}</Typography>
                  <Typography color='GrayText' variant='h6'>
                    {getPrice(receipt.sum)}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Paper>
              {isLoading ? (
                generateElements(<ReceiptFriendStatusItemSkeleton />, 3)
              ) : (
                <List>
                  {allContributors.map(user => (
                    <ReceiptFriendStatusItem
                      key={user}
                      receipt={receipt}
                      username={user}
                    />
                  ))}

                  <AddContributorItem user={user} />

                  <ReceiptStatusButton />
                </List>
              )}
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Wrapper>
  )
}

export default Receipt
