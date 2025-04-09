import type { CreateReceiptFormState } from '../create-receipt-form'
import Flex from '@components/flex'
import Paper from '@components/paper'
import Typography from '@components/typography'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import GenerateOrFillSwitch from './generate-or-fill-switch/generate-or-fill-switch'
import ManualAddProductList from './manual-add-product-list'

function ProductsSection() {
  const formContext = useFormContext<CreateReceiptFormState>()
  const shouldGenerateProducts = formContext.watch('shouldGenerateProducts')

  return (
    <Flex direction="column" alignContent="stretch">
      <Typography>Produkty</Typography>

      <Flex direction="column" alignContent="stretch" spacing={1}>
        <GenerateOrFillSwitch />

        <Paper>
          {shouldGenerateProducts && (
            <Flex direction="column" alignContent="stretch" p={1}>
              <Typography variant="base2">
                Produkty zostaną wygenerowane na podstawie załączonego zdjęcia paragonu
              </Typography>
            </Flex>
          )}
          {!shouldGenerateProducts && <ManualAddProductList />}
        </Paper>
      </Flex>
    </Flex>
  )
}

export default ProductsSection
