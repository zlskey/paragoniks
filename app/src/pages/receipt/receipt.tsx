import { Grid, Paper, Stack, Typography } from '@mui/material'

import { Product } from 'src/types/generic.types'
import ProductEditDialog from 'src/pages/receipt/components/product-edit-dialog'
import ProductItem from 'src/pages/receipt/components/product-item'
import ReceiptContributorsList from './components/receipt-contributors-list/receipt-contributors-list'
import TitleInput from 'src/pages/receipt/components/title-input'
import { Trans } from '@lingui/macro'
import Wrapper from 'src/components/wrapper'
import { getPrice } from 'src/helpers/utils/get-price'
import { useReceiptContext } from 'src/helpers/contexts/receipt/receipt.context'
import useScreenSize from 'src/helpers/hooks/use-screen-size'
import { useState } from 'react'
import { useUser } from 'src/helpers/contexts/current-user/current-user.context'
import useUserCutCalc from 'src/helpers/hooks/use-user-cut-calc'

const Receipt = () => {
  const { receipt } = useReceiptContext()

  const user = useUser()

  const { isDesktop } = useScreenSize()

  const userCut = useUserCutCalc(user._id, receipt)

  const [editedProduct, setEditedProduct] = useState<null | Product>(null)

  const handleSetEditedProduct = (product: Product) => () => {
    setEditedProduct(product)
  }

  const handleClearEditedProduct = () => {
    setEditedProduct(null)
  }

  return (
    <Wrapper>
      <ProductEditDialog
        product={editedProduct}
        onClose={handleClearEditedProduct}
      />

      <Grid
        container
        spacing={2}
        direction={isDesktop ? 'row-reverse' : undefined}
      >
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <TitleInput />

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
              <ReceiptContributorsList />
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            {receipt.products.map(product => (
              <ProductItem
                onEdit={handleSetEditedProduct(product)}
                product={product}
                key={product._id}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Wrapper>
  )
}

export default Receipt
