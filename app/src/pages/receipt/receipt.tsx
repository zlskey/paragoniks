import { Grid, List, Paper, Stack, Typography } from '@mui/material'
import ReceiptFriendStatusItem, {
  ReceiptFriendStatusItemSkeleton,
} from 'src/pages/receipt/components/receipt-friend-status-item'
import {
  selectReceiptLoading,
  selectSingleReceipt,
} from 'src/helpers/reducers/receipt/receipt.reducer'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'
import { useEffect, useState } from 'react'

import AddContributorItem from 'src/pages/receipt/components/add-contributor-item'
import { Product } from 'src/types/generic.types'
import ProductEditDialog from 'src/pages/receipt/components/product-edit-dialog'
import ProductItem from 'src/pages/receipt/components/product-item'
import ReceiptStatusButton from 'src/pages/receipt/components/receipt-status-button'
import TitleInput from 'src/pages/receipt/components/title-input'
import Wrapper from 'src/components/wrapper'
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

  const [editedProduct, setEditedProduct] = useState<null | Product>(null)

  useEffect(() => {
    if (!receipt) {
      dispatch(getSingleReceipt(id))
    }
  }, [])

  if (!receipt || !user) {
    return null
  }

  const handleSetEditedProduct = (product: Product) => {
    setEditedProduct(product)
  }

  const handleClearEditedProduct = () => {
    setEditedProduct(null)
  }

  const allContributors = [receipt.owner, ...receipt.contributors]

  return (
    <Wrapper>
      <ProductEditDialog
        receiptId={receipt._id}
        product={editedProduct}
        onClose={handleClearEditedProduct}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper>
            <List>
              {receipt.products.map(product => (
                <ProductItem
                  onEdit={handleSetEditedProduct}
                  isOwner={user.username === receipt.owner}
                  key={product._id}
                  product={product}
                />
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <TitleInput user={user} receipt={receipt} />

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
