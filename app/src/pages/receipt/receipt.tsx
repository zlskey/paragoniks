import { Grid, List, Paper, Stack, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'src/redux-hooks'
import { useEffect, useState } from 'react'

import { Product } from 'src/types/generic.types'
import ProductEditDialog from 'src/pages/receipt/components/product-edit-dialog'
import ProductItem from 'src/pages/receipt/components/product-item'
import ReceiptContributorsList from './components/receipt-contributors-list/receipt-contributors-list'
import TitleInput from 'src/pages/receipt/components/title-input'
import { Trans } from '@lingui/macro'
import Wrapper from 'src/components/wrapper'
import { getPrice } from 'src/helpers/utils/get-price'
import { getProfiles } from 'src/helpers/reducers/profiles/profiles.thunk'
import { getReceipt } from 'src/helpers/reducers/receipt/receipt.thunk'
import { selectSingleReceipt } from 'src/helpers/reducers/receipt/receipt.reducer'
import { selectUser } from 'src/helpers/reducers/user/user.reducer'
import { useParams } from 'react-router-dom'
import useUserCutCalc from 'src/helpers/hooks/use-user-cut-calc'

const Receipt = () => {
  const { receiptId } = useParams()

  if (!receiptId) {
    return
  }

  const dispatch = useAppDispatch()

  const receipt = useAppSelector(selectSingleReceipt(receiptId))

  const user = useAppSelector(selectUser)

  const userCut = useUserCutCalc(user?._id, receipt)

  const [editedProduct, setEditedProduct] = useState<null | Product>(null)

  useEffect(() => {
    if (!receipt) {
      dispatch(getReceipt({ receiptId }))
      return
    }
  }, [])

  useEffect(() => {
    if (receipt) {
      dispatch(
        getProfiles({
          userIds: receipt?.contributors
            .map(contributor => contributor)
            .concat([receipt?.owner]),
        })
      )
    }
  }, [receipt?.contributors, receipt?.owner])

  if (!receipt || !user) {
    return null
  }

  const handleSetEditedProduct = (product: Product) => {
    setEditedProduct(product)
  }

  const handleClearEditedProduct = () => {
    setEditedProduct(null)
  }

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
                  isOwner={user._id === receipt.owner}
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
                    <Trans>Your cut:</Trans>
                  </Typography>

                  <Typography color='GrayText' textAlign='left' variant='h6'>
                    <Trans>Receipt total:</Trans>
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
              <ReceiptContributorsList receipt={receipt} />
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Wrapper>
  )
}

export default Receipt
